DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS receipts;

CREATE TABLE receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  upload_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  merchant TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT,
  tag TEXT,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'review', 'completed')),
  receipt_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (receipt_id) REFERENCES receipts(id)
); 