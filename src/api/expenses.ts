import { Expense, Receipt, MatchingResult } from '../types';

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  try {
    const status = searchParams.get('status') || 'active';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const category = searchParams.get('category');
    const searchTerm = searchParams.get('searchTerm');

    let query = `
      SELECT * FROM expenses 
      WHERE status = ?
    `;
    const params: any[] = [status];

    if (startDate) {
      query += ` AND date >= ?`;
      params.push(startDate);
    }
    if (endDate) {
      query += ` AND date <= ?`;
      params.push(endDate);
    }
    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }
    if (searchTerm) {
      query += ` AND (description LIKE ? OR bank_reference LIKE ?)`;
      params.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    query += ` ORDER BY date DESC`;

    const result = await env.DB.prepare(query).bind(...params).all();
    return Response.json({ success: true, results: result.results });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const expense: Partial<Expense> = await request.json();

  try {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const result = await env.DB.prepare(`
      INSERT INTO expenses (
        id, date, description, amount, category, status,
        bank_reference, csv_source, match_confidence,
        submitted_date, last_modified, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      expense.date,
      expense.description,
      expense.amount,
      expense.category || null,
      expense.status || 'active',
      expense.bankReference || null,
      expense.csvSource || null,
      expense.matchConfidence || null,
      expense.submittedDate || null,
      now,
      now
    ).run();

    return Response.json({ success: true, id });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function onRequestPut(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  const updates: Partial<Expense> = await request.json();

  try {
    const setFields: string[] = [];
    const params: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        setFields.push(`${key} = ?`);
        params.push(value);
      }
    });

    setFields.push('last_modified = ?');
    params.push(new Date().toISOString());
    params.push(id);

    const query = `
      UPDATE expenses 
      SET ${setFields.join(', ')}
      WHERE id = ?
    `;

    const result = await env.DB.prepare(query).bind(...params).run();
    return Response.json({ success: true, changes: result.changes });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Handle receipt upload
export async function onRequestPost(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const expenseId = url.pathname.split('/').slice(-2)[0];
  
  try {
    const formData = await request.formData();
    const file = formData.get('receipt');
    
    if (!file) {
      throw new Error('No receipt file provided');
    }

    const buffer = await file.arrayBuffer();
    const id = crypto.randomUUID();
    const key = `receipts/${id}`;
    
    // Upload to R2
    await env.R2_ASSETS.put(key, buffer, {
      httpMetadata: {
        contentType: file.type,
      }
    });

    // Create receipt record
    const receipt: Partial<Receipt> = {
      id,
      filename: file.name,
      uploadDate: new Date().toISOString(),
      mimeType: file.type,
      size: file.size,
      expenseId,
      status: 'unmatched'
    };

    await env.DB.prepare(`
      INSERT INTO receipts (
        id, filename, upload_date, mime_type, size,
        expense_id, status, match_confidence, extracted_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      receipt.id,
      receipt.filename,
      receipt.uploadDate,
      receipt.mimeType,
      receipt.size,
      receipt.expenseId,
      receipt.status,
      null,
      null
    ).run();

    return Response.json({ success: true, receipt });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Match receipt to expense
export async function onRequestPost(context: any) {
  const { request, env } = context;
  const matchResult: MatchingResult = await request.json();

  try {
    const now = new Date().toISOString();

    // Update receipt
    await env.DB.prepare(`
      UPDATE receipts
      SET status = ?, match_confidence = ?, expense_id = ?
      WHERE id = ?
    `).bind(
      'matched',
      matchResult.confidence,
      matchResult.expenseId,
      matchResult.receiptId
    ).run();

    // Update expense
    await env.DB.prepare(`
      UPDATE expenses
      SET receipt_id = ?, match_confidence = ?, last_modified = ?
      WHERE id = ?
    `).bind(
      matchResult.receiptId,
      matchResult.confidence,
      now,
      matchResult.expenseId
    ).run();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
} 