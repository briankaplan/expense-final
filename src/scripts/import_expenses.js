import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse CSV file
const csvData = fs.readFileSync(path.join(__dirname, '../../src/app/api/expenses/data.csv'), 'utf-8');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// Function to extract file key from receipt URL
function getFileKeyFromUrl(url) {
  if (!url) return null;
  const parts = url.split('/');
  return parts[parts.length - 1];
}

// Function to get content type from file extension
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf'
  };
  return types[ext] || 'application/octet-stream';
}

// Generate SQL statements for import
const statements = [];

// Add transaction start
statements.push('BEGIN TRANSACTION;');

// Process each record
for (const record of records) {
  // Insert receipt if present
  let receiptId = null;
  if (record.receipt_url) {
    const fileKey = getFileKeyFromUrl(record.receipt_url);
    if (fileKey) {
      // Use INSERT OR IGNORE for receipts to handle duplicates
      statements.push(`
        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('${fileKey}', '${fileKey}', '${getContentType(fileKey)}');
      `);
      // Get the receipt ID (whether it was just inserted or already existed)
      receiptId = `(SELECT id FROM receipts WHERE file_key = '${fileKey}')`;
    }
  }

  // Insert expense
  statements.push(`
    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '${record['Transaction Date']}',
      '${record['Post Date']}',
      '${record.Description.replace(/'/g, "''")}',
      '${record.Category}',
      '${record.Type}',
      ${record.Amount},
      ${record.Memo ? `'${record.Memo.replace(/'/g, "''")}'` : 'NULL'},
      ${receiptId || 'NULL'},
      ${record.comment ? `'${record.comment.replace(/'/g, "''")}'` : 'NULL'},
      ${record.expensify_category ? `'${record.expensify_category.replace(/'/g, "''")}'` : 'NULL'},
      '${record.expense_type}',
      ${record.categorization_confidence || 'NULL'}
    );
  `);
}

// Add transaction commit
statements.push('COMMIT;');

// Write SQL to file
const sqlFile = path.join(__dirname, 'import.sql');
fs.writeFileSync(sqlFile, statements.join('\n'));

console.log('Generated SQL file:', sqlFile);
console.log('Run the following command to import:');
console.log('npx wrangler d1 execute expenses-local --local --file=src/scripts/import.sql'); 