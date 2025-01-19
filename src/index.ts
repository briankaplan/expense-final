import { Env } from './types';
import * as expenses from './api/expenses';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle static files
    if (request.method === 'GET' && !request.url.includes('/api/')) {
      try {
        // Serve index.html for the root path
        const url = new URL(request.url);
        const path = url.pathname === '/' ? '/index.html' : url.pathname;
        const asset = await env.ASSETS.fetch(new Request(`${url.origin}${path}`));
        
        if (asset.status === 404) {
          return new Response('Not Found', { status: 404 });
        }
        
        return asset;
      } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
      }
    }

    // Handle API requests
    if (request.url.includes('/api/expenses')) {
      const context = { request, env, ctx };
      return expenses.onRequest(context);
    }

    return new Response('Not Found', { status: 404 });
  }
}; 