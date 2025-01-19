import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/d1';

export const tokens = sqliteTable('tokens', {
  id: integer('id').primaryKey(),
  service: text('service').notNull(),
  email: text('email').notNull(),
  encrypted_tokens: text('encrypted_tokens').notNull(),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  service_email_idx: uniqueIndex('service_email_idx').on(table.service, table.email)
})); 