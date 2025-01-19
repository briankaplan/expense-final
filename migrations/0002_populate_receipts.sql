-- Populate receipts table from existing expenses
BEGIN TRANSACTION;

INSERT INTO receipts (
    id,
    file_key,
    file_name,
    content_type,
    upload_date,
    status,
    expense_id,
    match_confidence
)
SELECT 
    hex(randomblob(16)),
    receipt_url,
    substr(receipt_url, instr(receipt_url, '/') + 1),
    CASE 
        WHEN receipt_url LIKE '%.pdf' THEN 'application/pdf'
        WHEN receipt_url LIKE '%.jpg' OR receipt_url LIKE '%.jpeg' THEN 'image/jpeg'
        WHEN receipt_url LIKE '%.png' THEN 'image/png'
        ELSE 'application/octet-stream'
    END,
    created_at,
    'matched',
    id,
    1.0
FROM expenses
WHERE receipt_url IS NOT NULL;

COMMIT; 