-- Update expense statuses to active
UPDATE expenses 
SET status = 'active'
WHERE receipt_id IS NOT NULL;

-- Update receipt file keys to matched/complete folder
UPDATE receipts
SET file_key = REPLACE(file_key, 'uploads/pending/', 'matched/complete/')
WHERE file_key LIKE 'uploads/pending/%'; 