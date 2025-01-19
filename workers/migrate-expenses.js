import { migrateExpenses } from '../src/scripts/migrate-expenses';

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

      // Create database bindings
      const oldDb = env.OLD_DB;
      const newDb = env.DB;

      // Run migration
      const result = await migrateExpenses(oldDb, newDb);

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