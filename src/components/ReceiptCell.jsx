import React from 'react';
import { Eye } from 'lucide-react';

const ReceiptCell = ({ receipt_url, onViewReceipt }) => {
  return receipt_url ? (
    <button
      onClick={onViewReceipt}
      className="flex items-center text-[#1DB954] hover:text-[#1ed760] transition-colors"
    >
      <Eye className="w-4 h-4 mr-1" />
      View
    </button>
  ) : (
    <span className="text-gray-400">No receipt</span>
  );
};

export default ReceiptCell; 