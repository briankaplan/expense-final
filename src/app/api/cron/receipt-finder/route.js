import { NextResponse } from 'next/server';
import { receiptFinderService } from '@/services/receiptFinderService';

// This endpoint will be called by a cron job every 30 minutes
export async function GET(request, { env }) {
  try {
    // Verify the request is from our cron service
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all expenses without receipts from D1
    const { results: missingReceiptExpenses } = await env.DB.prepare(`
      SELECT * FROM expenses 
      WHERE receipt_url IS NULL 
      AND NOT EXISTS (
        SELECT 1 FROM receipts 
        WHERE receipts.expense_id = expenses.id
      )
      ORDER BY transaction_date DESC
    `).all();

    if (!missingReceiptExpenses?.length) {
      return NextResponse.json({
        message: 'No missing receipts to process'
      });
    }

    // Run the receipt finder
    const results = await receiptFinderService.findReceipts(missingReceiptExpenses);

    // Process found receipts
    const updates = [];
    
    // Update found receipts
    for (const result of results.found) {
      // Create receipt record
      const receiptId = crypto.randomUUID();
      const fileKey = `found/${result.receipt.source}/${result.expense.transaction_date}_${result.expense.merchant.replace(/[^a-zA-Z0-9]/g, '_')}_${Math.abs(result.expense.amount)}.${result.receipt.type}`;
      
      // Insert receipt
      updates.push(
        env.DB.prepare(`
          INSERT INTO receipts (
            id,
            file_key,
            file_name,
            content_type,
            status,
            expense_id,
            match_confidence,
            extracted_data
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          receiptId,
          fileKey,
          result.receipt.filename,
          result.receipt.contentType,
          'matched',
          result.expense.id,
          result.receipt.confidence,
          JSON.stringify(result.receipt.extractedData)
        ).run()
      );

      // Update expense with receipt URL
      updates.push(
        env.DB.prepare(`
          UPDATE expenses 
          SET receipt_url = ?,
              last_modified = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(
          `${process.env.PUBLIC_URL}/${fileKey}`,
          result.expense.id
        ).run()
      );
    }

    // Execute all updates
    await Promise.all(updates);

    // Return summary
    return NextResponse.json({
      message: 'Receipt finder completed',
      summary: {
        total: missingReceiptExpenses.length,
        found: results.found.length,
        manual: results.manual.length,
        notFound: results.notFound.length
      },
      learningProgress: receiptFinderService.getStatusReport().learningProgress
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Failed to process missing receipts' },
      { status: 500 }
    );
  }
} 