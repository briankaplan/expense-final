import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVImporter = ({ onImportComplete, onClose }) => {
  const [file, setFile] = useState(null);
  const [mappings, setMappings] = useState({});
  const [preview, setPreview] = useState([]);
  const [step, setStep] = useState('upload'); // upload, map, preview

  // Required fields for an expense
  const requiredFields = ['date', 'description', 'amount', 'category'];
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setPreview(results.data.slice(0, 5));
          setFile(file);
          setStep('map');
        },
        header: true
      });
    }
  };

  const handleMapping = (csvField, expenseField) => {
    setMappings(prev => ({
      ...prev,
      [expenseField]: csvField
    }));
  };

  const handleImport = () => {
    Papa.parse(file, {
      complete: (results) => {
        const processedExpenses = results.data.map(row => ({
          date: row[mappings.date],
          description: row[mappings.description],
          amount: parseFloat(row[mappings.amount]),
          category: row[mappings.category],
          comment: mappings.comment ? row[mappings.comment] : '',
          status: 'active'
        })).filter(expense => 
          expense.date && 
          expense.description && 
          !isNaN(expense.amount)
        );
        
        onImportComplete(processedExpenses);
      },
      header: true
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Import Expenses from CSV</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
      </div>

      {step === 'upload' && (
        <div className="text-center p-8">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Select CSV File
          </label>
        </div>
      )}

      {step === 'map' && (
        <div className="space-y-4">
          <h3 className="font-medium">Map CSV Fields to Expense Fields</h3>
          {preview.length > 0 && (
            <div className="space-y-3">
              {requiredFields.map(field => (
                <div key={field} className="flex items-center gap-4">
                  <label className="w-32 font-medium capitalize">{field}:</label>
                  <select
                    value={mappings[field] || ''}
                    onChange={(e) => handleMapping(e.target.value, field)}
                    className="border rounded p-2 flex-1"
                  >
                    <option value="">Select CSV field</option>
                    {Object.keys(preview[0]).map(header => (
                      <option key={header} value={header}>{header}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setStep('upload')}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep('preview')}
              disabled={!requiredFields.every(field => mappings[field])}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Preview
            </button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="space-y-4">
          <h3 className="font-medium">Preview Import Data</h3>
          <div className="max-h-96 overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {requiredFields.map(field => (
                    <th key={field} className="border p-2 bg-gray-50 text-left">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i}>
                    {requiredFields.map(field => (
                      <td key={field} className="border p-2">
                        {row[mappings[field]]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setStep('map')}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleImport}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Import Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVImporter; 