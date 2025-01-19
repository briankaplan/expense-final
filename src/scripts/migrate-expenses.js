import { categorizeExpense } from '../lib/categorization';

export async function migrateExpenses(oldDb, newDb) {
  try {
    // Get all expenses from the old database
    const { results: oldExpenses } = await oldDb.prepare(
      'SELECT * FROM expenses ORDER BY transaction_date DESC'
    ).run();

    // Prepare batch insert statement for the new database
    const batchInsert = newDb.prepare(`
      INSERT INTO expenses (
        merchant, amount, description, transaction_date, 
        receipt_url, comment, category, category_details, 
        needs_review, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Process each expense
    for (const expense of oldExpenses) {
      try {
        // Auto-categorize the expense
        const { category, details, isIncomplete } = categorizeExpense({
          merchant: expense.merchant || '',
          description: expense.description || '',
          comment: expense.comment || ''
        });

        // Insert into new database with categorization
        await batchInsert.bind(
          expense.merchant || '',
          expense.amount || 0,
          expense.description || '',
          expense.transaction_date || new Date().toISOString(),
          expense.receipt_url || null,
          expense.comment || '',
          category,
          details,
          isIncomplete ? 1 : 0,
          expense.created_at || new Date().toISOString()
        ).run();

        successCount++;
      } catch (error) {
        console.error('Error processing expense:', expense.id, error);
        errorCount++;
        errors.push({ id: expense.id, error: error.message });
      }
    }

    return {
      success: true,
      total: oldExpenses.length,
      successCount,
      errorCount,
      errors: errors.length > 0 ? errors : undefined,
      message: `Successfully migrated ${successCount} expenses, failed ${errorCount}`
    };
  } catch (error) {
    console.error('Migration error:', error);
    return {
      success: false,
      error: error.message
    };
  }
} 