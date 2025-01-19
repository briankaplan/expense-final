import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

const ReceiptDropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
        transition-colors ${
          isDragActive
            ? 'border-[#1DB954] bg-[#1DB954]/5'
            : 'border-gray-300 hover:border-[#1DB954]'
        }`}
    >
      <input {...getInputProps()} />
      <Upload className={`w-12 h-12 mx-auto mb-4 ${
        isDragActive ? 'text-[#1DB954]' : 'text-gray-400'
      }`} />
      <p className="text-sm text-gray-600 mb-2">
        {isDragActive
          ? 'Drop the receipt here'
          : 'Drag and drop your receipt here, or click to select'}
      </p>
      <p className="text-xs text-gray-500">
        Supports JPG, PNG and PDF files
      </p>
    </div>
  );
};

export default ReceiptDropzone; 