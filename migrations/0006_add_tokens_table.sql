-- Create tokens table
DROP TABLE IF EXISTS tokens;

CREATE TABLE tokens (
  id INTEGER PRIMARY KEY,
  service TEXT NOT NULL,
  email TEXT NOT NULL,
  encrypted_tokens TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Create unique index on service and email
CREATE UNIQUE INDEX service_email_idx ON tokens(service, email); 