-- Link expenses to receipts based on amount and date
UPDATE expenses
SET receipt_id = (
  SELECT r.id
  FROM receipts r
  WHERE DATE(r.upload_date) = expenses.date
  AND r.file_name LIKE '%' || REPLACE(expenses.merchant, ' ', '_') || '%'
  AND r.file_name LIKE '%' || CAST(expenses.amount AS TEXT) || '%'
  LIMIT 1
); 