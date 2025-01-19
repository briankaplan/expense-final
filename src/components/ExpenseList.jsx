import { useState } from 'react';
import { FileText, ExternalLink, Loader2 } from 'lucide-react';

export default function ExpenseList({ expenses, onUpdate }) {
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReceiptClick = async (expense) => {
    if (!expense.receipt_url) return;

    // Open receipt in new tab
    window.open(expense.receipt_url, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div
            className="p-4 cursor-pointer"
            onClick={() => setExpandedId(expandedId === expense.id ? null : expense.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    expense.receipt_url ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div>
                  <h3 className="font-medium">{expense.merchant || 'Unknown Merchant'}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(expense.transaction_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">{formatCurrency(expense.amount)}</span>
                {expense.receipt_url && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReceiptClick(expense);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {expandedId === expense.id && (
            <div className="px-4 pb-4 border-t">
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span>{expense.category || 'Uncategorized'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Receipt Status:</span>
                  <span>
                    {expense.receipt_url ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-600">Missing</span>
                    )}
                  </span>
                </div>
                {expense.receipt_url && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Receipt Source:</span>
                    <span>{expense.receipt_source || 'Manual Upload'}</span>
                  </div>
                )}
                {expense.notes && (
                  <div className="text-sm">
                    <span className="text-gray-500">Notes:</span>
                    <p className="mt-1">{expense.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {expenses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No expenses found.
        </div>
      )}
    </div>
  );
} 