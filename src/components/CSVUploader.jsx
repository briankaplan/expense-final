import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Papa from 'papaparse';
import { autoMapColumns, validateMapping, extractMappedValue } from '../lib/csvMapping';
import { formatDate, formatAmount } from '../lib/utils';
import { categorizeExpense } from '../lib/categorization';

export default function CSVUploader({ onUploadComplete }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [mappingPreview, setMappingPreview] = useState(null);

  const processCSV = async (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            reject(results.errors);
            return;
          }

          try {
            // Auto-map columns
            const headers = Object.keys(results.data[0]);
            const mapping = autoMapColumns(headers);

            // Validate required fields
            if (!validateMapping(mapping)) {
              reject(new Error('Could not find required fields in CSV: transaction date, merchant, and amount'));
              return;
            }

            // Map CSV data to match database schema
            const expenses = results.data.map(row => {
              try {
                const merchant = extractMappedValue(row, mapping, 'merchant');
                const description = extractMappedValue(row, mapping, 'description') || '';
                
                // Get category from CSV if available, otherwise auto-categorize
                let category = extractMappedValue(row, mapping, 'category');
                let categoryDetails = '';
                let confidence = 1.0;
                
                if (!category) {
                  const categorization = categorizeExpense(merchant, description);
                  category = categorization.category;
                  categoryDetails = categorization.details;
                  confidence = categorization.confidence;
                }
                
                return {
                  transaction_date: formatDate(extractMappedValue(row, mapping, 'transaction_date')),
                  post_date: extractMappedValue(row, mapping, 'post_date') ? 
                    formatDate(extractMappedValue(row, mapping, 'post_date')) : null,
                  merchant,
                  description,
                  category,
                  category_details: categoryDetails,
                  type: extractMappedValue(row, mapping, 'type') || 'Sale',
                  amount: formatAmount(extractMappedValue(row, mapping, 'amount')),
                  memo: extractMappedValue(row, mapping, 'memo') || '',
                  receipt_url: extractMappedValue(row, mapping, 'receipt_url') || '',
                  expensify_category: extractMappedValue(row, mapping, 'expensify_category') || '',
                  expense_type: extractMappedValue(row, mapping, 'expense_type') || 'business',
                  categorization_confidence: confidence,
                  needs_review: confidence < 0.7
                };
              } catch (err) {
                console.error('Error processing row:', row, err);
                throw err;
              }
            }).filter(expense => 
              expense.transaction_date && 
              expense.merchant && 
              !isNaN(expense.amount)
            );

            // Set mapping preview for first few rows
            setMappingPreview({
              mapping,
              sample: expenses.slice(0, 3)
            });

            resolve(expenses);
          } catch (err) {
            reject(err);
          }
        },
        error: (error) => reject(error)
      });
    });
  };

  const uploadExpenses = async (expenses) => {
    try {
      const response = await fetch('/api/expenses/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expenses }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to import expenses');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Import failed');
      }
      return result;
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setIsUploading(true);
    setError(null);
    setUploadResult(null);
    setMappingPreview(null);

    try {
      const file = acceptedFiles[0];
      const expenses = await processCSV(file);
      const result = await uploadExpenses(expenses);
      setUploadResult(result);
      if (onUploadComplete) {
        onUploadComplete(result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-[#1DB954] bg-[#1DB954]/10' : 'border-gray-700'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          hover:border-[#1DB954] hover:bg-[#1DB954]/5
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg text-white">Drop the CSV file here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2 text-white">Drag and drop a CSV file here, or click to select</p>
            <p className="text-sm text-gray-400">Only CSV files are accepted</p>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="mt-4 text-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#1DB954] border-t-transparent mx-auto mb-2" />
          Uploading and processing expenses...
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {mappingPreview && !error && !uploadResult && (
        <div className="mt-4 p-4 bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg">
          <h3 className="font-medium text-[#1DB954] mb-2">Column Mapping Preview:</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(mappingPreview.mapping).map(([field, header]) => (
              <div key={field} className="flex justify-between">
                <span className="text-gray-400">{field}:</span>
                <span className="text-white">{header}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-[#1DB954] mb-2">Sample Data:</h4>
            <div className="space-y-2">
              {mappingPreview.sample.map((expense, i) => (
                <div key={i} className="text-sm text-gray-400">
                  {expense.transaction_date} - {expense.merchant} - ${Math.abs(expense.amount).toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {uploadResult && (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-[#1DB954]/10 border border-[#1DB954]/20 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[#1DB954] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#1DB954]">Successfully imported {uploadResult.successful} expenses</p>
              {uploadResult.skipped > 0 && (
                <p className="text-yellow-500 mt-2">Skipped {uploadResult.skipped} duplicate entries</p>
              )}
              {uploadResult.failed > 0 && (
                <p className="text-red-500 mt-2">Failed to import {uploadResult.failed} expenses</p>
              )}
            </div>
          </div>

          {uploadResult.duplicates?.length > 0 && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h3 className="text-yellow-500 font-medium mb-2">Skipped Duplicates:</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                {uploadResult.duplicates.map((dup, i) => (
                  <li key={i}>
                    {dup.merchant} - ${Math.abs(dup.amount)} ({dup.transaction_date})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {uploadResult.errors?.length > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h3 className="text-red-500 font-medium mb-2">Failed Imports:</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                {uploadResult.errors.map((err, i) => (
                  <li key={i}>
                    {err.merchant} - ${Math.abs(err.amount)}: {err.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 