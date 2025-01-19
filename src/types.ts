// Types for the expense tracking system

export interface Env {
    DB: D1Database;
    R2_ASSETS: R2Bucket;
    ASSETS: {
        fetch: (request: Request) => Promise<Response>;
    };
}

export interface Expense {
    id: number;
    date: string;
    merchant: string;
    amount: number;
    category?: string;
    tag?: string;
    description?: string;
    status: 'active' | 'review' | 'completed';
    receipt_id?: number;
    bank_reference?: string;
    csv_source?: string;
    match_confidence?: number;
    submitted_date?: string;
    last_modified: string;
    created_at: string;
}

export interface Receipt {
    id: number;
    file_key: string;
    file_name: string;
    content_type: string;
    upload_date: string;
    status: 'unmatched' | 'matched' | 'processed';
    match_confidence?: number;
    extracted_data?: {
        date?: string;
        amount?: number;
        merchant?: string;
        items?: Array<{
            description: string;
            amount: number;
        }>;
    };
}

export interface CSVImportConfig {
    type: 'bank_statement' | 'expensify' | 'custom';
    dateFormat: string;
    mapping: {
        date: string;
        merchant: string;
        amount: string;
        category?: string;
        tag?: string;
        reference?: string;
    };
    transformations?: {
        amount?: 'invert' | 'multiply' | 'divide';
        amountFactor?: number;
    };
}

export interface MatchingResult {
    expenseId: number;
    receiptId: number;
    confidence: number;
    matchedFields: {
        date?: boolean;
        amount?: boolean;
        merchant?: boolean;
    };
}

// D1 Database Schema
export const schema = {
    expenses: `
        CREATE TABLE IF NOT EXISTS expenses (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT,
            status TEXT NOT NULL,
            receipt_id TEXT,
            bank_reference TEXT,
            csv_source TEXT,
            match_confidence REAL,
            submitted_date TEXT,
            last_modified TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY(receipt_id) REFERENCES receipts(id)
        )
    `,
    receipts: `
        CREATE TABLE IF NOT EXISTS receipts (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            upload_date TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            size INTEGER NOT NULL,
            expense_id TEXT,
            status TEXT NOT NULL,
            match_confidence REAL,
            extracted_data TEXT,
            FOREIGN KEY(expense_id) REFERENCES expenses(id)
        )
    `,
    csv_imports: `
        CREATE TABLE IF NOT EXISTS csv_imports (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            import_date TEXT NOT NULL,
            type TEXT NOT NULL,
            status TEXT NOT NULL,
            rows_processed INTEGER NOT NULL,
            rows_imported INTEGER NOT NULL,
            errors TEXT
        )
    `
}; 