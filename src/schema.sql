DROP TABLE IF EXISTS expenses;

CREATE TABLE expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_date TEXT,
  post_date TEXT,
  description TEXT,
  category TEXT,
  type TEXT,
  amount REAL,
  memo TEXT,
  receipt_url TEXT,
  comment TEXT,
  expensify_category TEXT,
  expense_type TEXT,
  categorization_confidence REAL
); 