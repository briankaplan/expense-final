import React, { useState } from 'react';
import { Receipt, ArrowRight } from 'lucide-react';

const ReceiptMatcher = ({ expenses, receipts, onMatch }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleMatch = () => {
    if (selectedExpense && selectedReceipt) {
      onMatch({
        expenseId: selectedExpense.id,
        receiptId: selectedReceipt.id
      });
      setSelectedExpense(null);
      setSelectedReceipt(null);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Expenses List */}
        <div className="border rounded-lg">
          <div className="p-3 border-b bg-gray-50 font-medium">Unmatched Expenses</div>
          <div className="p-3 space-y-2 max-h-[60vh] overflow-auto">
            {expenses.map(expense => (
              <div
                key={expense.id}
                onClick={() => setSelectedExpense(expense)}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                  selectedExpense?.id === expense.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="font-medium">{expense.description}</div>
                <div className="text-sm text-gray-600">
                  {new Date(expense.date).toLocaleDateString()} - ${expense.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Matching Area */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleMatch}
            disabled={!selectedExpense || !selectedReceipt}
            className="p-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Receipts List */}
        <div className="border rounded-lg">
          <div className="p-3 border-b bg-gray-50 font-medium">Unmatched Receipts</div>
          <div className="p-3 space-y-2 max-h-[60vh] overflow-auto">
            {receipts.map(receipt => (
              <div
                key={receipt.id}
                onClick={() => setSelectedReceipt(receipt)}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                  selectedReceipt?.id === receipt.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium">Receipt #{receipt.id}</div>
                    <div className="text-sm text-gray-600">
                      {receipt.extractedData?.date && 
                        new Date(receipt.extractedData.date).toLocaleDateString()}
                      {receipt.extractedData?.amount && 
                        ` - $${receipt.extractedData.amount.toFixed(2)}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptMatcher; 