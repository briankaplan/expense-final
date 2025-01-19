import { categorizeExpense } from '../lib/categorization';

export async function updateCategories(db) {
  const expenses = await db.prepare(
    'SELECT * FROM expenses ORDER BY transaction_date DESC'
  ).all();
  
  let successCount = 0;
  let errorCount = 0;
  
  const stmt = await db.prepare(`
    UPDATE expenses 
    SET category = ?, 
        category_details = ?,
        categorization_confidence = ?,
        needs_review = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  
  for (const expense of expenses.results) {
    try {
      const { category, details, confidence, needs_review } = categorizeExpense(expense);
      
      await stmt.bind(
        category,
        details,
        confidence,
        needs_review,
        expense.id
      ).run();
      
      successCount++;
    } catch (error) {
      console.error(`Error updating expense ${expense.id}:`, error);
      errorCount++;
    }
  }
  
  return {
    success: true,
    total: expenses.results.length,
    successCount,
    errorCount,
    message: `Successfully updated ${successCount} expenses, failed ${errorCount}`
  };
} 