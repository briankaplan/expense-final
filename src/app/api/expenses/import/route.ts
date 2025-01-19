import { NextResponse } from 'next/server';
import { env } from 'process';

// Add D1 and R2 types
interface D1Database {
  prepare: (query: string) => {
    bind: (...args: any[]) => {
      first: () => Promise<any>;
      run: () => Promise<{ lastRowId: number }>;
      all: () => Promise<{ results: any[] }>;
    };
  };
}

interface R2Bucket {
  put: (key: string, value: any, options?: { httpMetadata?: { contentType: string } }) => Promise<void>;
}

interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
}

export async function POST(request: Request) {
  try {
    const { expenses } = await request.json();

    // Connect to D1 database
    const DB = (process.env as unknown as Env).DB;
    if (!DB) {
      throw new Error('Database connection not available');
    }

    // Connect to R2 bucket
    const BUCKET = (process.env as unknown as Env).BUCKET;
    if (!BUCKET) {
      throw new Error('R2 bucket not available');
    }

    const results: Array<{ success: boolean; id: string; merchant: string; amount: number }> = [];
    const errors: Array<{ merchant: string; amount: number; error: string }> = [];
    const duplicates: Array<{ merchant: string; amount: number; transaction_date: string }> = [];

    for (const expense of expenses) {
      try {
        // Parse and format the date
        const transactionDate = expense.Transaction_Date || expense.transaction_date;
        const [month, day, year] = transactionDate.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        // Parse and format the amount
        const amount = parseFloat(expense.Amount || expense.amount);

        // Check for duplicates
        const existingExpense = await DB.prepare(`
          SELECT id FROM expenses 
          WHERE transaction_date = ? 
          AND merchant = ? 
          AND ABS(amount - ?) < 0.01
        `).bind(
          formattedDate,
          expense.Description || expense.merchant,
          amount
        ).first();

        if (existingExpense) {
          duplicates.push({
            merchant: expense.Description || expense.merchant,
            amount: amount,
            transaction_date: formattedDate
          });
          continue;
        }

        // Process receipt if available
        let receipt_url = null;
        let receipt_id = null;
        
        // If receipt_url is provided in the CSV, use it
        if (expense.receipt_url) {
          receipt_url = expense.receipt_url;
        }
        // If receipt data is provided, upload it
        else if (expense.receipt) {
          const receiptData = expense.receipt;
          const fileName = `imported/${formattedDate}_${(expense.Description || expense.merchant).replace(/[^a-zA-Z0-9]/g, '_')}_${Math.abs(amount)}.${expense.receipt_type}`;
          
          // Upload to R2
          await BUCKET.put(fileName, receiptData, {
            httpMetadata: {
              contentType: `image/${expense.receipt_type}`,
            },
          });
          
          receipt_url = `${env.PUBLIC_URL}/${fileName}`;

          // Create receipt record
          const receiptResult = await DB.prepare(`
            INSERT INTO receipts (
              id,
              file_key,
              file_name,
              content_type,
              status,
              match_confidence
            ) VALUES (?, ?, ?, ?, ?, ?)
          `).bind(
            crypto.randomUUID(),
            fileName,
            fileName,
            `image/${expense.receipt_type}`,
            'matched',
            1.0
          ).run();

          receipt_id = receiptResult.lastRowId;
        }

        // Insert into D1
        const expenseId = crypto.randomUUID();
        const result = await DB.prepare(`
          INSERT INTO expenses (
            id,
            transaction_date,
            post_date,
            merchant,
            description,
            category,
            type,
            amount,
            memo,
            receipt_url,
            expensify_category,
            expense_type,
            categorization_confidence,
            comment
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          expenseId,
          formattedDate,
          expense.Post_Date ? expense.Post_Date.split('/').reverse().join('-') : null,
          expense.Description || expense.merchant,
          expense.Description || '',
          expense.Category || expense.category || '',
          expense.Type || expense.type || 'Sale',
          amount,
          expense.Memo || expense.memo || '',
          receipt_url,
          expense.expensify_category || '',
          expense.expense_type || 'business',
          expense.categorization_confidence || 1.0,
          expense.comment || ''
        ).run();

        // If we created a receipt, link it to the expense
        if (receipt_id) {
          await DB.prepare(`
            UPDATE receipts 
            SET expense_id = ? 
            WHERE id = ?
          `).bind(expenseId, receipt_id).run();
        }

        results.push({
          success: true,
          id: expenseId,
          merchant: expense.Description || expense.merchant,
          amount: amount,
        });
      } catch (err: any) {
        console.error('Error processing expense:', err);
        errors.push({
          merchant: expense.Description || expense.merchant,
          amount: parseFloat(expense.Amount || expense.amount),
          error: err.message || 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      errors,
      duplicates,
      summary: {
        total: expenses.length,
        imported: results.length,
        errors: errors.length,
        duplicates: duplicates.length
      }
    });

  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
} 