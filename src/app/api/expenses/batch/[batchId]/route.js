import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';

export async function DELETE(request, { params }) {
  try {
    const { batchId } = params;
    
    if (!batchId) {
      return NextResponse.json({ error: 'No batch ID provided' }, { status: 400 });
    }

    const db = env.DB;
    
    // Get the count of expenses in this batch
    const countResult = await db.prepare(`
      SELECT COUNT(*) as count FROM expenses WHERE batch_id = ?
    `).bind(batchId).all();

    const count = countResult?.results?.[0]?.count || 0;

    // Delete all expenses in this batch
    await db.prepare(`
      DELETE FROM expenses WHERE batch_id = ?
    `).bind(batchId).run();

    // Also clean up any pending records if they exist
    await db.prepare(`
      DELETE FROM pending_expenses WHERE batch_id = ?
    `).bind(batchId).run();

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${count} expenses from batch ${batchId}`,
      count
    });

  } catch (error) {
    console.error('Batch deletion error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 