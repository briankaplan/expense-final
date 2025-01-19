import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const WORKER_PORT = 8787;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const workerUrl = `http://127.0.0.1:${WORKER_PORT}${request.nextUrl.pathname}${request.nextUrl.search}`;
    
    try {
      const requestInit: RequestInit = {
        method: request.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Only add body for non-GET requests
      if (request.method !== 'GET') {
        const body = await request.text();
        if (body) {
          requestInit.body = body;
          (requestInit.headers as Record<string, string>)['Content-Length'] = Buffer.byteLength(body).toString();
        }
      }

      const response = await fetch(workerUrl, requestInit);
      const data = await response.json();
      
      return NextResponse.json(data);
    } catch (error) {
      console.error('Worker connection error: ', error);
      return NextResponse.json(
        { success: false, error: 'Failed to connect to worker' },
        { status: 500 }
      );
    }
  }
  return NextResponse.next();
} 