import { useState } from 'react';
import Papa from 'papaparse';

export default function BusinessMissingReceiptsImporter({ onImportComplete }) {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState(null);
  const [importResult, setImportResult] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    setError(null);
    setImportResult(null);

    try {
      // Parse CSV file
      const results = await new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => {
            // Normalize header names by removing spaces and special characters
            return header.trim().replace(/\s+/g, '');
          },
          complete: (results) => {
            console.log('CSV Headers:', results.meta.fields);
            console.log('First row sample:', results.data[0]);
            resolve(results);
          },
          error: (error) => reject(error)
        });
      });

      // Map CSV fields to expected format
      const expenses = results.data
        .map((row, index) => {
          // Debug log for problematic rows
          console.log(`Processing row ${index}:`, row);

          // Get the transaction date
          const transactionDate = row.TransactionDate || row['Transaction Date'];
          if (!transactionDate) {
            console.warn(`Row ${index}: Missing Transaction Date`);
            return null;
          }

          // Get the description/merchant
          const description = row.Description || row.Merchant;
          if (!description) {
            console.warn(`Row ${index}: Missing Description/Merchant`);
            return null;
          }
          
          // Parse amount with better error handling
          const rawAmount = (row.Amount || row.amount || '').toString();
          console.log(`Row ${index} raw amount:`, rawAmount);
          
          // Remove currency symbols, commas, and handle parentheses for negative numbers
          const cleanAmount = rawAmount
            .replace(/[$,]/g, '')
            .replace(/^\((.*)\)$/, '-$1')
            .trim();
          
          const parsedAmount = parseFloat(cleanAmount);
          
          if (isNaN(parsedAmount)) {
            console.warn(`Row ${index}: Invalid Amount format:`, rawAmount);
            return null;
          }

          // Format the transaction date
          const [month, day, year] = transactionDate.split('/');
          const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

          // Format the post date if available
          let formattedPostDate = null;
          const postDate = row.PostDate || row['Post Date'];
          if (postDate) {
            const [pMonth, pDay, pYear] = postDate.split('/');
            formattedPostDate = `${pYear}-${pMonth.padStart(2, '0')}-${pDay.padStart(2, '0')}`;
          }

          // Create expense object with strict type checking
          const expense = {
            transaction_date: formattedDate,
            post_date: formattedPostDate || formattedDate,
            merchant: description,
            description: description,
            category: row.Category || '',
            type: row.Type || 'Sale',
            amount: parsedAmount,
            memo: row.Memo || '',
            receipt_url: null,
            expensify_category: '',
            expense_type: 'business',
            categorization_confidence: 1.0,
            comment: ''
          };

          // Validate the expense object
          console.log(`Row ${index} mapped to:`, expense);

          // Only return if we have the minimum required fields
          if (!expense.transaction_date || !expense.merchant || isNaN(expense.amount)) {
            console.warn(`Row ${index}: Missing required fields after mapping`, expense);
            return null;
          }

          return expense;
        })
        .filter(expense => expense !== null);

      console.log('Total valid expenses:', expenses.length);
      console.log('Sample of first valid expense:', expenses[0]);

      if (expenses.length === 0) {
        throw new Error('No valid expenses found in the CSV file. Please check that your CSV has the required columns: Transaction Date, Description/Merchant, and Amount.');
      }

      // Send to API
      const response = await fetch('/api/expenses/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expenses })
      });

      if (!response.ok) {
        throw new Error('Failed to import expenses');
      }

      const result = await response.json();
      setImportResult(result);
      
      if (onImportComplete) {
        onImportComplete(result);
      }
    } catch (err) {
      console.error('Import error:', err);
      setError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Import Business Missing Receipts</h2>
        <p className="text-sm text-gray-600">
          Upload a CSV file containing business expenses missing receipts.
          The file should have the following columns: Transaction Date, Post Date, Description,
          Category, Type, Amount, Memo
        </p>
      </div>

      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      {isImporting && (
        <div className="mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-center text-sm text-gray-600 mt-2">Importing expenses...</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {importResult && (
        <div className="mb-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded mb-2">
            <p className="text-sm text-green-600">
              Successfully imported {importResult.summary?.imported || importResult.imported || 0} expenses
            </p>
          </div>

          {(importResult.summary?.duplicates > 0 || importResult.duplicates?.length > 0) && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded mb-2">
              <p className="text-sm text-yellow-600">
                Skipped {importResult.summary?.duplicates || importResult.duplicates?.length || 0} duplicate expenses
              </p>
              <div className="mt-2 max-h-40 overflow-y-auto">
                <ul className="text-xs text-gray-600">
                  {(importResult.duplicates || []).map((dup, i) => (
                    <li key={i}>
                      {dup.merchant || dup.Description} - ${Math.abs(parseFloat(dup.amount || dup.Amount)).toFixed(2)} ({dup.transaction_date || dup.Transaction_Date})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {(importResult.summary?.errors > 0 || importResult.errors?.length > 0) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600">
                Failed to import {importResult.summary?.errors || importResult.errors?.length || 0} expenses
              </p>
              <div className="mt-2 max-h-40 overflow-y-auto">
                <ul className="text-xs text-gray-600">
                  {(importResult.errors || []).map((err, i) => (
                    <li key={i}>
                      {err.merchant || err.Description} - ${Math.abs(parseFloat(err.amount || err.Amount)).toFixed(2)}: {err.error || 'Unknown error'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 