import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';

export async function POST(request) {
  try {
    const { batchId, skipDuplicates } = await request.json();
    
    if (!batchId) {
      return NextResponse.json({ error: 'No batch ID provided' }, { status: 400 });
    }

    const db = env.DB;
    
    // Get the pending records for this batch
    const pendingRecords = await db.prepare(`
      SELECT * FROM pending_expenses WHERE batch_id = ?
    `).bind(batchId).all();

    if (!pendingRecords?.results?.length) {
      return NextResponse.json({ error: 'No pending records found' }, { status: 404 });
    }

    let successCount = 0;
    let errorCount = 0;
    const insertedIds = [];

    // Process each record
    for (const record of pendingRecords.results) {
      try {
        // Check for duplicates if not skipping
        if (!skipDuplicates) {
          const existingExpense = await db.prepare(`
            SELECT id FROM expenses 
            WHERE transaction_date = ? 
            AND amount = ? 
            AND (merchant = ? OR description = ?)
          `).bind(
            record.transaction_date,
            record.amount,
            record.merchant,
            record.description
          ).all();

          if (existingExpense?.results?.length > 0) {
            errorCount++;
            continue;
          }
        }

        // Insert the record
        const result = await db.prepare(`
          INSERT INTO expenses (
            transaction_date,
            merchant,
            amount,
            description,
            memo,
            category,
            receipt_url,
            needs_review,
            is_completed,
            batch_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0, ?)
        `).bind(
          record.transaction_date,
          record.merchant,
          record.amount,
          record.description,
          record.memo,
          record.category,
          null,
          batchId
        ).run();

        successCount++;
        if (result?.lastRowId) {
          insertedIds.push(result.lastRowId);
        }
      } catch (error) {
        console.error('Error inserting record:', error);
        errorCount++;
      }
    }

    // Clean up pending records
    await db.prepare(`
      DELETE FROM pending_expenses WHERE batch_id = ?
    `).bind(batchId).run();

    // Trigger auto-categorization
    const categorizationResponse = await fetch('/api/update-categories', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.CRON_SECRET}`
      }
    });

    if (!categorizationResponse.ok) {
      console.error('Failed to auto-categorize expenses');
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${successCount} expenses, skipped ${errorCount}`,
      successCount,
      errorCount,
      batchId,
      insertedIds
    });

  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 