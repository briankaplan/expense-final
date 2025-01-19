// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Helper to handle errors
function handleError(error) {
  console.error('Error:', error);
  return new Response(JSON.stringify({ success: false, error: error.message }), {
    status: 500,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

// Helper to create JSON response
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify({ success: true, ...data }), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      
      // Handle CORS preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      // Handle /api/expenses/import route
      if (url.pathname === '/api/expenses/import' && request.method === 'POST') {
        const { expenses } = await request.json();
        
        const results = [];
        const errors = [];
        const duplicates = [];
        
        for (const expense of expenses) {
          try {
            // Check for duplicates
            const existingExpense = await env.DB.prepare(`
              SELECT id FROM expenses 
              WHERE transaction_date = ? 
              AND merchant = ? 
              AND ABS(amount - ?) < 0.01
            `).bind(
              expense.transaction_date,
              expense.merchant,
              expense.amount
            ).first();

            if (existingExpense) {
              duplicates.push({
                merchant: expense.merchant,
                amount: expense.amount,
                transaction_date: expense.transaction_date
              });
              continue;
            }

            // Process receipt if available
            let receipt_url = null;
            if (expense.receipt) {
              const receiptData = expense.receipt;
              const fileName = `imported/${expense.transaction_date}_${expense.merchant.replace(/[^a-zA-Z0-9]/g, '_')}_${Math.abs(expense.amount)}.${expense.receipt_type}`;
              
              // Upload to R2
              await env.BUCKET.put(fileName, receiptData, {
                httpMetadata: {
                  contentType: `image/${expense.receipt_type}`,
                },
              });
              
              receipt_url = `${env.PUBLIC_URL}/${fileName}`;
            }

            // Insert into D1
            const result = await env.DB.prepare(`
              INSERT INTO expenses (
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
                categorization_confidence
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
              expense.transaction_date,
              expense.post_date,
              expense.merchant,
              expense.description,
              expense.category,
              expense.type,
              expense.amount,
              expense.memo || '',
              receipt_url,
              expense.expensify_category || '',
              expense.expense_type || 'business',
              expense.categorization_confidence || 1
            ).run();

            results.push({
              success: true,
              id: result.lastRowId,
              merchant: expense.merchant,
              amount: expense.amount,
            });
          } catch (err) {
            console.error('Error processing expense:', err);
            errors.push({
              merchant: expense.merchant,
              amount: expense.amount,
              error: err.message,
            });
          }
        }

        return jsonResponse({
          results,
          errors,
          duplicates,
          total: expenses.length,
          successful: results.length,
          failed: errors.length,
          skipped: duplicates.length
        });
      }

      // Handle /api/expenses route
      if (url.pathname === '/api/expenses') {
        if (request.method === 'GET') {
          // Check database connection
          if (!env.DB) {
            console.error('Database connection not available');
            return handleError(new Error('Database connection not available'));
          }

          try {
            const result = await env.DB.prepare(`
              SELECT 
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
                categorization_confidence
              FROM expenses 
              ORDER BY transaction_date DESC
            `).all();

            if (!result || !result.results) {
              console.error('Invalid database response:', result);
              return handleError(new Error('Invalid database response'));
            }

            return jsonResponse({ expenses: result.results });
          } catch (err) {
            console.error('Database query error:', err);
            return handleError(err);
          }
        }

        if (request.method === 'POST') {
          const data = await request.json();
          const { 
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
            categorization_confidence
          } = data;

          const result = await env.DB.prepare(`
            INSERT INTO expenses (
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
              categorization_confidence
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
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
            categorization_confidence
          ).run();

          return jsonResponse({ id: result.lastRowId }, 201);
        }
      }

      // Handle /api/expenses/:id route
      if (url.pathname.startsWith('/api/expenses/') && url.pathname !== '/api/expenses/import') {
        const id = url.pathname.split('/').pop();

        if (request.method === 'GET') {
          const result = await env.DB.prepare(`
            SELECT * FROM expenses WHERE id = ?
          `).bind(id).first();

          if (!result) {
            return new Response(JSON.stringify({ success: false, error: 'Expense not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }

          return jsonResponse({ expense: result });
        }

        if (request.method === 'DELETE') {
          // Check if expense exists
          const expense = await env.DB.prepare(`
            SELECT * FROM expenses WHERE id = ?
          `).bind(parseInt(id)).first();

          if (!expense) {
            return new Response(JSON.stringify({ success: false, error: 'Expense not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }

          // Delete the expense
          await env.DB.prepare(`
            DELETE FROM expenses WHERE id = ?
          `).bind(parseInt(id)).run();

          return jsonResponse({ message: 'Expense deleted successfully' });
        }

        if (request.method === 'PATCH') {
          const data = await request.json();
          const { description } = data;

          const result = await env.DB.prepare(`
            UPDATE expenses 
            SET description = ?
            WHERE id = ?
            RETURNING *
          `).bind(description, id).first();

          if (!result) {
            return new Response(JSON.stringify({ success: false, error: 'Expense not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
          }

          return jsonResponse({ expense: result });
        }
      }

      // Handle unknown routes
      return jsonResponse({ error: 'Not Found' }, 404);
    } catch (err) {
      console.error('Worker error:', err);
      return handleError(err);
    }
  }
}; 