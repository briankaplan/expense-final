import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';

// Helper to send a stream update
const sendUpdate = (stream, update) => {
  stream.write(`data: ${JSON.stringify(update)}\n\n`);
};

const SEARCH_LOCATIONS = [
  'Gmail',
  'Google Drive',
  'Dropbox',
  'OneDrive',
  'Local Downloads',
  'Expensify Inbox'
];

export async function POST(request) {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Start the search process in the background
  (async () => {
    try {
      const { expenseIds } = await request.json();
      
      if (!expenseIds?.length) {
        throw new Error('No expense IDs provided');
      }

      const db = env.DB;

      // Get the expenses to search for
      const expenses = await db.prepare(`
        SELECT id, transaction_date, amount, merchant, description 
        FROM expenses 
        WHERE id IN (${expenseIds.join(',')})
      `).all();

      if (!expenses?.results?.length) {
        throw new Error('No expenses found');
      }

      // Search each location
      for (const location of SEARCH_LOCATIONS) {
        // Notify that we're starting to search this location
        sendUpdate(writer, {
          type: 'LOCATION_START',
          location
        });

        // Simulate searching with a delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        let foundCount = 0;

        // Process each expense
        for (const expense of expenses.results) {
          // Simulate finding some receipts (you'll replace this with actual search logic)
          const found = Math.random() > 0.7;
          
          if (found) {
            foundCount++;
            const receiptUrl = `receipts/${location}/${expense.id}.pdf`;
            
            // Send update about found receipt
            sendUpdate(writer, {
              type: 'RECEIPT_FOUND',
              location,
              expenseId: expense.id,
              amount: expense.amount,
              date: expense.transaction_date,
              receiptUrl
            });

            // Update the expense in the database
            await db.prepare(`
              UPDATE expenses 
              SET receipt_url = ?, 
                  updated_at = CURRENT_TIMESTAMP 
              WHERE id = ?
            `).bind(receiptUrl, expense.id).run();
          }
        }

        // Notify that we're done with this location
        sendUpdate(writer, {
          type: 'LOCATION_COMPLETE',
          location,
          foundCount
        });
      }

      // All done
      sendUpdate(writer, {
        type: 'COMPLETE',
        message: 'Receipt search completed'
      });

    } catch (error) {
      console.error('Receipt finder error:', error);
      sendUpdate(writer, {
        type: 'ERROR',
        error: error.message
      });
    } finally {
      writer.close();
    }
  })();

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
} 