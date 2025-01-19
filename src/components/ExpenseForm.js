import React, { useState } from 'react';

export function ExpenseForm({ expense, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    merchant: expense?.merchant || '',
    amount: expense?.amount || '',
    description: expense?.description || '',
    transaction_date: expense?.transaction_date || new Date().toISOString().split('T')[0],
    receipt_url: expense?.receipt_url || '',
    comment: expense?.comment || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Merchant</label>
        <input
          type="text"
          name="merchant"
          value={formData.merchant}
          onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
          className="w-full rounded-md border-border bg-background px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
          className="w-full rounded-md border-border bg-background px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-md border-border bg-background px-3 py-2"
          rows="2"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Comment (for categorization)</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="w-full rounded-md border-border bg-background px-3 py-2"
          rows="2"
          placeholder="Add details like client names, locations, or context for better categorization"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Transaction Date</label>
        <input
          type="date"
          name="transaction_date"
          value={formData.transaction_date}
          onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
          className="w-full rounded-md border-border bg-background px-3 py-2"
          required
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-border hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {expense ? 'Update' : 'Create'} Expense
        </button>
      </div>
    </form>
  );
} 