import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileFilters = ({ activeFilters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filters = {
    dateRange: [
      { id: 'all', label: 'All Time' },
      { id: 'today', label: 'Today' },
      { id: 'week', label: 'This Week' },
      { id: 'month', label: 'This Month' },
      { id: 'year', label: 'This Year' }
    ],
    category: [
      { id: 'all', label: 'All Categories' },
      { id: 'food', label: 'Food & Dining' },
      { id: 'transport', label: 'Transportation' },
      { id: 'shopping', label: 'Shopping' },
      { id: 'utilities', label: 'Utilities' },
      { id: 'other', label: 'Other' }
    ],
    amount: [
      { id: 'all', label: 'Any Amount' },
      { id: 'under_10', label: 'Under $10' },
      { id: '10_50', label: '$10 - $50' },
      { id: '50_100', label: '$50 - $100' },
      { id: 'over_100', label: 'Over $100' }
    ]
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        <Filter className="w-5 h-5 text-gray-600" />
        {Object.values(activeFilters).some(f => f !== 'all') && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#1DB954] rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-0 p-4 bg-white shadow-lg z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(filters).map(([key, options]) => (
                <div key={key}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {key === 'dateRange' ? 'Date Range' :
                     key === 'category' ? 'Category' :
                     'Amount Range'}
                  </h4>
                  <div className="space-y-2">
                    {options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => {
                          onFilterChange(key, option.id);
                          if (key === 'dateRange') setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm
                          ${activeFilters[key] === option.id
                            ? 'bg-[#1DB954] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileFilters; 