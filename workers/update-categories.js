const CATEGORIES = {
  RESTAURANTS: {
    keywords: ['GRIL', 'RESTAURANT', 'CAFE', 'DINER', 'BAR', 'GOAT', 'DEL FRISCOS'],
    category: 'BD: Meals & Entertainment',
    details: 'Restaurant/Dining'
  },
  PARKING: {
    keywords: ['PARKING', 'GARAGE'],
    category: 'BD: Travel',
    details: 'Parking'
  },
  TRAVEL: {
    keywords: ['HOTEL', 'FLIGHT', 'AIRLINE', 'AIRFARE', 'CAR RENTAL', 'TAXI', 'UBER', 'LYFT'],
    category: 'BD: Travel',
    details: 'Travel Expense'
  },
  OFFICE: {
    keywords: ['OFFICE', 'SUPPLIES', 'STAPLES', 'PRINTER', 'INK'],
    category: 'BD: Office Supplies',
    details: 'Office Materials'
  }
};

function categorizeExpense(expense) {
  const description = expense.description?.toUpperCase() || '';
  const memo = expense.memo?.toUpperCase() || '';
  const combinedText = `${description} ${memo}`;
  
  // Check for specific categories first
  for (const [type, config] of Object.entries(CATEGORIES)) {
    if (config.keywords.some(keyword => combinedText.includes(keyword))) {
      return {
        category: config.category,
        details: config.details,
        confidence: 0.8,
        needs_review: 0
      };
    }
  }
  
  // If no specific category found, mark for review
  return {
    category: 'BD: Other Costs',
    details: 'Needs Classification',
    confidence: 0.3,
    needs_review: 1
  };
}

async function updateCategories(db) {
  try {
    console.log('Starting update process...');
    const expensesResult = await db.prepare(
      'SELECT * FROM expenses ORDER BY transaction_date DESC'
    ).all();
    
    console.log('Fetched expenses:', expensesResult);
    
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
    
    if (!expensesResult?.results) {
      throw new Error('No expenses found in result');
    }
    
    for (const expense of expensesResult.results) {
      try {
        console.log('Processing expense:', expense);
        const { category, details, confidence, needs_review } = categorizeExpense(expense);
        console.log('Categorization result:', { category, details, confidence, needs_review });
        
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
      total: expensesResult.results.length,
      successCount,
      errorCount,
      message: `Successfully updated ${successCount} expenses, failed ${errorCount}`
    };
  } catch (error) {
    console.error('Update process error:', error);
    throw error;
  }
}

export default {
  async fetch(request, env) {
    try {
      // Only allow POST requests with the correct secret
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
      }

      const authHeader = request.headers.get('Authorization');
      if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
      }

      // Run the update
      const result = await updateCategories(env.DB);
      console.log('Update completed:', result);

      return Response.json(result);
    } catch (error) {
      console.error('Worker error:', error);
      return Response.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }
  }
}; 