import { categorizeExpense } from '@/lib/categorization';

export async function POST(request) {
  try {
    const data = await request.json();
    const { merchant, amount, description, transaction_date, receipt_url, comment } = data;
    
    // Auto-categorize the expense
    const { category, details, isIncomplete } = categorizeExpense({
      merchant,
      description,
      comment
    });
    
    const { results } = await env.DB.prepare(`
      INSERT INTO expenses (merchant, amount, description, transaction_date, receipt_url, comment, category, category_details, needs_review)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(merchant, amount, description, transaction_date, receipt_url, comment, category, details, isIncomplete ? 1 : 0)
    .run();
    
    return Response.json({ success: true, data: results });
  } catch (error) {
    console.error('Error creating expense:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, merchant, amount, description, transaction_date, receipt_url, comment } = data;
    
    // Auto-categorize the expense
    const { category, details, isIncomplete } = categorizeExpense({
      merchant,
      description,
      comment
    });
    
    const { results } = await env.DB.prepare(`
      UPDATE expenses 
      SET merchant = ?, amount = ?, description = ?, transaction_date = ?, 
          receipt_url = ?, comment = ?, category = ?, category_details = ?, 
          needs_review = ?
      WHERE id = ?
    `)
    .bind(
      merchant, amount, description, transaction_date, receipt_url, 
      comment, category, details, isIncomplete ? 1 : 0, id
    )
    .run();
    
    return Response.json({ success: true, data: results });
  } catch (error) {
    console.error('Error updating expense:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
} 