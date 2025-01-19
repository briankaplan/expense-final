import { Client } from '@upstash/qstash';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const qstash = new Client({
  token: process.env.QSTASH_TOKEN
});

async function setupSchedule() {
  try {
    const schedule = await qstash.schedules.create({
      destination: 'https://receipt-finder-cron.kaplan-brian.workers.dev/api/cron/receipt-finder',
      cron: '*/30 * * * *',
      retries: 3,
      headers: {
        'Authorization': `Bearer ${process.env.CRON_SECRET}`
      }
    });

    console.log('Schedule created:', schedule);
  } catch (error) {
    console.error('Failed to create schedule:', error);
  }
}

setupSchedule(); 