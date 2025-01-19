import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { env } from '@/env.mjs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const csvText = await file.text();
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true
    });

    const db = env.DB;
    
    // Generate a unique batch ID for this upload
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    
    // Check for potential duplicates first
    const duplicates = [];
    for (const record of records) {
      const existingExpense = await db.prepare(`
        SELECT id, transaction_date, merchant, amount, description 
        FROM expenses 
        WHERE transaction_date = ? 
        AND amount = ? 
        AND (merchant = ? OR description = ?)
      `).bind(
        record.transaction_date,
        parseFloat(record.amount),
        record.merchant,
        record.description
      ).all();

      if (existingExpense?.results?.length > 0) {
        duplicates.push({
          new: record,
          existing: existingExpense.results[0]
        });
      }
    }

    // If duplicates found, return them for user review
    if (duplicates.length > 0) {
      return NextResponse.json({
        status: 'DUPLICATES_FOUND',
        duplicates,
        batchId,
        totalRecords: records.length
      });
    }

    // Prepare insert statement
    const stmt = await db.prepare(`
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
    `);

    let successCount = 0;
    let errorCount = 0;
    const insertedIds = [];

    // Process each record
    for (const record of records) {
      try {
        const result = await stmt.bind(
          record.transaction_date,
          record.merchant,
          parseFloat(record.amount),
          record.description,
          record.memo,
          record.category,
          null, // No receipt initially
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
      message: `Successfully imported ${successCount} expenses, failed ${errorCount}`,
      successCount,
      errorCount,
      batchId,
      insertedIds
    });

  } catch (error) {
    console.error('CSV upload error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 