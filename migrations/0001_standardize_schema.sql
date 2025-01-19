-- Standardize schema for D1
BEGIN TRANSACTION;

-- Create backup tables
CREATE TABLE expenses_backup AS SELECT * FROM expenses;
CREATE TABLE receipts_backup AS SELECT * FROM receipts;

-- Drop existing tables
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS receipts;

-- Create new tables with standardized schema
CREATE TABLE receipts (
    id TEXT PRIMARY KEY,
    file_key TEXT NOT NULL,
    file_name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    upload_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'unmatched' CHECK(status IN ('unmatched', 'matched', 'processed')),
    expense_id TEXT,
    match_confidence REAL,
    extracted_data TEXT
);

CREATE TABLE expenses (
    id TEXT PRIMARY KEY,
    transaction_date TEXT NOT NULL,
    post_date TEXT,
    merchant TEXT NOT NULL,
    description TEXT,
    category TEXT,
    type TEXT,
    amount REAL NOT NULL,
    memo TEXT,
    receipt_url TEXT,
    expensify_category TEXT,
    expense_type TEXT DEFAULT 'business',
    categorization_confidence REAL DEFAULT 1.0,
    last_modified TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_expenses_transaction_date ON expenses(transaction_date);
CREATE INDEX idx_expenses_merchant ON expenses(merchant);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_receipt_url ON expenses(receipt_url);
CREATE INDEX idx_receipts_expense_id ON receipts(expense_id);
CREATE INDEX idx_receipts_status ON receipts(status);

-- Migrate data from backup tables
INSERT INTO expenses (
    id,
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
    categorization_confidence,
    last_modified,
    created_at
)
SELECT 
    COALESCE(id, hex(randomblob(16))),
    transaction_date,
    post_date,
    COALESCE(merchant, description),
    description,
    category,
    type,
    amount,
    memo,
    receipt_url,
    expensify_category,
    COALESCE(expense_type, 'business'),
    COALESCE(categorization_confidence, 1.0),
    COALESCE(last_modified, CURRENT_TIMESTAMP),
    COALESCE(created_at, CURRENT_TIMESTAMP)
FROM expenses_backup;

INSERT INTO receipts (
    id,
    file_key,
    file_name,
    content_type,
    upload_date,
    status,
    expense_id,
    match_confidence,
    extracted_data
)
SELECT 
    COALESCE(id, hex(randomblob(16))),
    COALESCE(file_key, filename),
    COALESCE(file_name, filename),
    COALESCE(content_type, 'application/octet-stream'),
    COALESCE(upload_date, CURRENT_TIMESTAMP),
    COALESCE(status, 'unmatched'),
    expense_id,
    match_confidence,
    extracted_data
FROM receipts_backup;

-- Drop backup tables
DROP TABLE expenses_backup;
DROP TABLE receipts_backup;

COMMIT; 