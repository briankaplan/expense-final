import { Receiver } from '@upstash/qstash';

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      
      // If this is the API endpoint, handle receipt finding
      if (url.pathname === '/api/cron/receipt-finder') {
        // Check authorization
        const authHeader = request.headers.get('Authorization');
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token || token !== env.CRON_SECRET) {
          return new Response('Unauthorized', { status: 401 });
        }

        // TODO: Implement receipt finding logic here
        return new Response(JSON.stringify({ status: 'success', message: 'Receipt finder executed' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // For root path, handle QStash verification
      if (url.pathname === '/') {
        const signature = request.headers.get('upstash-signature');
        
        if (signature) {
          // Handle QStash request
          const receiver = new Receiver({
            currentSigningKey: env.QSTASH_SIGNING_KEY,
          });

          const body = await request.text();
          const isValid = await receiver.verify({
            signature,
            body
          });

          if (!isValid) {
            return new Response('Invalid signature', { status: 401 });
          }

          // Call our own API endpoint
          const response = await fetch(`${env.APP_URL}/api/cron/receipt-finder`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${env.CRON_SECRET}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to run receipt finder: ${error.message}`);
          }

          const result = await response.json();
          console.log('Receipt finder completed:', result);

          return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          // Handle direct request - check CRON_SECRET
          const authHeader = request.headers.get('Authorization');
          const token = authHeader && authHeader.split(' ')[1];
          
          if (!token || token !== env.CRON_SECRET) {
            return new Response('Unauthorized', { status: 401 });
          }

          // Call our own API endpoint
          const response = await fetch(`${env.APP_URL}/api/cron/receipt-finder`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${env.CRON_SECRET}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to run receipt finder: ${error.message}`);
          }

          const result = await response.json();
          console.log('Receipt finder completed:', result);

          return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // Handle unknown paths
      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Receipt finder error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}; 