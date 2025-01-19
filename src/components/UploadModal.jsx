'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, Check, Trash2 } from 'lucide-react';

export function UploadModal({ onClose }) {
  const [status, setStatus] = useState('IDLE'); // IDLE, UPLOADING, REVIEW_DUPLICATES, COMPLETE, ERROR
  const [progress, setProgress] = useState(0);
  const [duplicates, setDuplicates] = useState([]);
  const [batchId, setBatchId] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const handleUpload = async (file) => {
    try {
      setStatus('UPLOADING');
      setProgress(0);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      if (result.status === 'DUPLICATES_FOUND') {
        setDuplicates(result.duplicates);
        setBatchId(result.batchId);
        setStatus('REVIEW_DUPLICATES');
        return;
      }

      setUploadResult(result);
      setBatchId(result.batchId);
      setStatus('COMPLETE');
      
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setStatus('ERROR');
    }
  };

  const handleDeleteBatch = async () => {
    try {
      const response = await fetch('/api/expenses/batch/' + batchId, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete batch');
      }

      window.location.reload();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleConfirmUpload = async () => {
    try {
      setStatus('UPLOADING');
      
      const response = await fetch('/api/upload-csv/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId,
          skipDuplicates
        })
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setUploadResult(result);
      setStatus('COMPLETE');

      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setStatus('ERROR');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <h2 className="text-lg font-semibold text-white">Upload Expenses</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/[0.06] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'IDLE' && (
            <div className="text-center">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleUpload(e.target.files[0])}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DB954] text-black font-medium hover:bg-[#1ed760] transition-colors cursor-pointer"
              >
                Choose CSV File
              </label>
            </div>
          )}

          {status === 'UPLOADING' && (
            <div>
              <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1DB954] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-center text-white/60">
                Uploading... {progress}%
              </p>
            </div>
          )}

          {status === 'REVIEW_DUPLICATES' && (
            <div>
              <div className="flex items-center gap-2 p-4 bg-yellow-500/10 text-yellow-400 rounded-lg mb-4">
                <AlertTriangle className="w-5 h-5" />
                <p>Found {duplicates.length} potential duplicate expenses</p>
              </div>

              <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                {duplicates.map((dup, index) => (
                  <div key={index} className="p-4 bg-white/[0.02] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">
                        {new Date(dup.new.transaction_date).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-medium">
                        ${Math.abs(dup.new.amount).toFixed(2)}
                      </span>
                    </div>
                    <p className="font-medium">{dup.new.merchant || dup.new.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={skipDuplicates}
                    onChange={(e) => setSkipDuplicates(e.target.checked)}
                    className="rounded border-white/20 bg-transparent checked:bg-[#1DB954] checked:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954]"
                  />
                  <span className="text-sm">Skip duplicate entries</span>
                </label>

                <button
                  onClick={handleConfirmUpload}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DB954] text-black font-medium hover:bg-[#1ed760] transition-colors ml-auto"
                >
                  <Check className="w-4 h-4" />
                  Continue Upload
                </button>
              </div>
            </div>
          )}

          {status === 'COMPLETE' && (
            <div>
              <div className="flex items-center gap-2 p-4 bg-green-500/10 text-green-400 rounded-lg mb-4">
                <Check className="w-5 h-5" />
                <p>Successfully uploaded {uploadResult.successCount} expenses</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-lg">
                <div>
                  <p className="text-sm text-white/60">Batch ID</p>
                  <p className="font-mono">{batchId}</p>
                </div>
                <button
                  onClick={handleDeleteBatch}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Batch
                </button>
              </div>
            </div>
          )}

          {status === 'ERROR' && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
              <p>Failed to upload expenses. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 