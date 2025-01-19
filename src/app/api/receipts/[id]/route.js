import { NextResponse } from 'next/server';

const WORKER_URL = process.env.WORKER_URL || 'http://localhost:8787';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`${WORKER_URL}/receipts/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch receipt: ${response.statusText}`);
    }

    // Get the content type from the worker response
    const contentType = response.headers.get('content-type');
    
    // Get the receipt file as a blob
    const blob = await response.blob();
    
    // Return the file with the correct content type
    return new NextResponse(blob, {
      headers: {
        'content-type': contentType || 'application/octet-stream',
        'cache-control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error fetching receipt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipt' },
      { status: 500 }
    );
  }
} 