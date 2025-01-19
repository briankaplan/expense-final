import { Env } from '../types';
import { R2_FOLDERS, uploadToR2, moveToFolder, getFileFromR2, deleteFromR2 } from '../utils/r2';

export async function onRequestPost(context: any) {
  const { request, env } = context;
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const expenseId = formData.get('expenseId');

  if (!file || !expenseId) {
    return Response.json(
      { success: false, error: 'Missing file or expenseId' },
      { status: 400 }
    );
  }

  try {
    // Check for existing receipt with same name
    const existingReceipt = await env.DB.prepare(`
      SELECT * FROM receipts 
      WHERE file_name = ?
    `).bind(file.name).first();

    if (existingReceipt) {
      // If receipt exists, verify it exists in R2
      const existingFile = await getFileFromR2(env.BUCKET, existingReceipt.file_key);
      if (existingFile) {
        // Link existing receipt to expense
        await env.DB.prepare(`
          UPDATE expenses 
          SET receipt_id = ?, status = 'active'
          WHERE id = ?
        `).bind(existingReceipt.id, expenseId).run();

        return Response.json({
          success: true,
          id: existingReceipt.id,
          url: env.BUCKET.get(existingReceipt.file_key).publicUrl,
          message: 'Existing receipt linked'
        });
      } else {
        // If file doesn't exist in R2, clean up DB record
        await env.DB.prepare(`
          DELETE FROM receipts WHERE id = ?
        `).bind(existingReceipt.id).run();
      }
    }

    // Start transaction
    await env.DB.prepare('BEGIN TRANSACTION').run();

    try {
      // Upload file to pending folder
      const { key, url } = await uploadToR2(env.BUCKET, file);

      // Create receipt record
      const result = await env.DB.prepare(`
        INSERT INTO receipts (
          file_key, file_name, content_type
        ) VALUES (?, ?, ?)
        RETURNING id
      `).bind(
        key,
        file.name,
        file.type
      ).first();

      if (!result?.id) {
        throw new Error('Failed to create receipt record');
      }

      // Link receipt to expense and update status
      await env.DB.prepare(`
        UPDATE expenses 
        SET receipt_id = ?, status = 'active'
        WHERE id = ?
      `).bind(result.id, expenseId).run();

      // Move file to matched/complete folder
      const newKey = await moveToFolder(
        env.BUCKET,
        key,
        R2_FOLDERS.MATCHED.COMPLETE
      );

      // Update receipt record with new key
      await env.DB.prepare(`
        UPDATE receipts 
        SET file_key = ?
        WHERE id = ?
      `).bind(newKey, result.id).run();

      await env.DB.prepare('COMMIT').run();

      return Response.json({
        success: true,
        id: result.id,
        url,
        message: 'Receipt uploaded and linked'
      });
    } catch (error) {
      await env.DB.prepare('ROLLBACK').run();
      throw error;
    }
  } catch (error) {
    console.error('Receipt upload error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function onRequestGet(context: any) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    const result = await env.DB.prepare(`
      SELECT * FROM receipts WHERE id = ?
    `).bind(id).first();

    if (!result) {
      return Response.json(
        { success: false, error: 'Receipt not found' },
        { status: 404 }
      );
    }

    const object = await env.BUCKET.get(result.file_key);
    if (!object) {
      return Response.json(
        { success: false, error: 'Receipt file not found' },
        { status: 404 }
      );
    }

    return new Response(object.body, {
      headers: {
        'Content-Type': result.content_type,
        'Content-Disposition': `inline; filename="${result.file_name}"`,
      },
    });
  } catch (error) {
    console.error('Receipt fetch error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 