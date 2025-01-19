const csv = require('csv-parse/sync');
const fs = require('fs');
const { execSync } = require('child_process');

// Read and parse CSV file
const fileContent = fs.readFileSync('src/app/api/expenses/data.csv', 'utf-8');
const records = csv.parse(fileContent, {
  columns: true,
  skip_empty_lines: true
});

// Generate SQL statements
const insertStatements = records.map(record => {
  const amount = Math.abs(parseFloat(record.Amount)) * -1; // Make expenses negative
  
  return `INSERT INTO expenses (
    transaction_date,
    post_date,
    merchant,
    description,
    category,
    type,
    amount,
    memo,
    receipt_url,
    expensify_category,
    expense_type,
    categorization_confidence
  ) VALUES (
    '${record['Transaction Date']}',
    '${record['Post Date']}',
    '${(record.Description || '').replace(/'/g, "''")}',
    '${(record.comment || '').replace(/'/g, "''")}',
    '${record.Category}',
    '${record.Type}',
    ${amount},
    '${(record.Memo || '').replace(/'/g, "''")}',
    '${(record.receipt_url || '').replace(/'/g, "''")}',
    '${(record.expensify_category || '').replace(/'/g, "''")}',
    '${(record.expense_type || '').replace(/'/g, "''")}',
    ${record.categorization_confidence ? parseFloat(record.categorization_confidence) : 'NULL'}
  );`;
}).join('\n');

// Write SQL to a file
fs.writeFileSync('src/app/api/expenses/import.sql', insertStatements);

// Execute the SQL using wrangler
execSync('wrangler d1 execute expenses --local --file=src/app/api/expenses/import.sql', { stdio: 'inherit' });

console.log('Import completed successfully!'); 