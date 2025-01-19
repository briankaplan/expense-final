import { levenshtein } from './utils';

// Common variations of field names
const FIELD_VARIATIONS = {
  transaction_date: ['date', 'trans date', 'transaction date', 'posted date', 'posting date', 'Date', 'Transaction Date'],
  post_date: ['post date', 'posted date', 'posting date', 'cleared date', 'Post Date'],
  merchant: ['merchant', 'description', 'payee', 'vendor', 'name', 'Merchant', 'Description', 'Payee'],
  description: ['description', 'memo', 'notes', 'details', 'comment', 'Description', 'Memo', 'Notes'],
  category: ['category', 'type', 'expense type', 'Category', 'Type'],
  type: ['type', 'transaction type', 'trans type', 'Type', 'Transaction Type'],
  amount: ['amount', 'total', 'price', 'cost', 'Amount', 'Total', 'Price'],
  memo: ['memo', 'notes', 'comment', 'description', 'Memo', 'Notes'],
  receipt_url: ['receipt', 'receipt url', 'attachment', 'Receipt URL', 'Attachment'],
  expensify_category: ['expensify category', 'expense category', 'Category'],
  expense_type: ['expense type', 'transaction type', 'type', 'Expense Type']
};

// Normalize text for comparison
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Calculate similarity score between two strings
function calculateSimilarity(str1: string, str2: string): number {
  const norm1 = normalizeText(str1);
  const norm2 = normalizeText(str2);
  
  // Exact match after normalization
  if (norm1 === norm2) return 1;
  
  // Calculate Levenshtein distance
  const distance = levenshtein(norm1, norm2);
  const maxLength = Math.max(norm1.length, norm2.length);
  
  // Convert distance to similarity score (0-1)
  return 1 - (distance / maxLength);
}

// Find best match for a CSV column header
function findBestMatch(header: string, targetField: string): number {
  const variations = FIELD_VARIATIONS[targetField] || [targetField];
  let bestScore = 0;
  
  for (const variation of variations) {
    const score = calculateSimilarity(header, variation);
    if (score > bestScore) {
      bestScore = score;
    }
  }
  
  return bestScore;
}

export interface ColumnMapping {
  [key: string]: string;
}

export function autoMapColumns(headers: string[]): ColumnMapping {
  const mapping: ColumnMapping = {};
  const usedHeaders = new Set<string>();
  
  // Required fields to map
  const requiredFields = [
    'transaction_date',
    'merchant',
    'amount'
  ];
  
  // Optional fields to map if found
  const optionalFields = [
    'post_date',
    'description',
    'category',
    'type',
    'memo',
    'receipt_url',
    'expensify_category',
    'expense_type'
  ];
  
  // First pass: map required fields
  for (const field of requiredFields) {
    let bestHeader = '';
    let bestScore = 0;
    
    for (const header of headers) {
      if (usedHeaders.has(header)) continue;
      
      const score = findBestMatch(header, field);
      if (score > bestScore && score > 0.7) { // Threshold for required fields
        bestScore = score;
        bestHeader = header;
      }
    }
    
    if (bestHeader) {
      mapping[field] = bestHeader;
      usedHeaders.add(bestHeader);
    }
  }
  
  // Second pass: map optional fields
  for (const field of optionalFields) {
    let bestHeader = '';
    let bestScore = 0;
    
    for (const header of headers) {
      if (usedHeaders.has(header)) continue;
      
      const score = findBestMatch(header, field);
      if (score > bestScore && score > 0.5) { // Lower threshold for optional fields
        bestScore = score;
        bestHeader = header;
      }
    }
    
    if (bestHeader) {
      mapping[field] = bestHeader;
      usedHeaders.add(bestHeader);
    }
  }
  
  return mapping;
}

// Validate that required fields are mapped
export function validateMapping(mapping: ColumnMapping): boolean {
  const requiredFields = ['transaction_date', 'merchant', 'amount'];
  return requiredFields.every(field => mapping[field]);
}

// Helper to extract value from CSV row using mapping
export function extractMappedValue(row: any, mapping: ColumnMapping, field: string): any {
  const headerName = mapping[field];
  return headerName ? row[headerName] : null;
} 