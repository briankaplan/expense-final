import { unstable_dev } from 'wrangler';
import { importExpenses } from './import_expenses.js';

async function main() {
  try {
    // Start the worker in dev mode with D1 binding
    const worker = await unstable_dev('src/worker.js', {
      experimental: { disableExperimentalWarning: true },
      local: true,
      persist: true,
      config: {
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'expenses-local',
            database_id: '769c8a16-9eb4-456e-8f35-654e83e25cc6'
          }
        ]
      }
    });

    // Run the import
    await importExpenses({ DB: worker.env.DB });

    // Close the worker
    await worker.stop();
  } catch (error) {
    console.error('Failed to run import:', error);
    process.exit(1);
  }
}

main(); 