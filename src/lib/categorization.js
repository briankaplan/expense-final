// Expense categories and their associated keywords
const CATEGORIES = {
  'DH: Travel Costs - Gas/Rental Car': ['gas', 'rental car', 'fuel', 'hertz', 'enterprise'],
  'Software subscriptions': ['subscription', 'adobe', 'microsoft', 'saas'],
  'DH: BD: Client Business Meals': ['dinner', 'lunch', 'restaurant', 'meal'],
  'Company Meetings and Meals': ['meeting', 'catering', 'team lunch'],
  'Conference': ['conference', 'seminar', 'workshop'],
  'Travel Costs - Hotel': ['hotel', 'stay', 'accommodation'],
  'DH: Travel Costs - Cab/Uber/Bus Fare': ['uber', 'lyft', 'taxi', 'bus'],
  'Travel Costs - Airfare': ['flight', 'airline', 'ticket'],
  'DH: Travel Costs - Meals': ['meal', 'dining'],
  'BD: Subscriptions & Research Costs': ['membership', 'journal', 'database'],
  'BD: Advertising & Promotion': ['ad campaign', 'promotion', 'branding'],
  'Office Supplies': ['stationery', 'pens', 'printer', 'office depot'],
  'Meals': ['meal', 'dining', 'restaurant', 'food'],
  'BD: Other Costs': [],
  RESTAURANTS: {
    keywords: ['GRIL', 'RESTAURANT', 'CAFE', 'DINER', 'BAR', 'GOAT', 'DEL FRISCOS'],
    category: 'BD: Meals & Entertainment',
    details: 'Restaurant/Dining'
  },
  PARKING: {
    keywords: ['PARKING', 'GARAGE'],
    category: 'BD: Travel',
    details: 'Parking'
  },
  TRAVEL: {
    keywords: ['HOTEL', 'FLIGHT', 'AIRLINE', 'AIRFARE', 'CAR RENTAL', 'TAXI', 'UBER', 'LYFT'],
    category: 'BD: Travel',
    details: 'Travel Expense'
  },
  OFFICE: {
    keywords: ['OFFICE', 'SUPPLIES', 'STAPLES', 'PRINTER', 'INK'],
    category: 'BD: Office Supplies',
    details: 'Office Materials'
  }
};

// Location keywords for travel expenses
const LOCATION_KEYWORDS = ['in', 'to', 'at', 'from'];

/**
 * Extract location from text using common patterns
 * @param {string} text - Text to extract location from
 * @returns {string|null} - Extracted location or null if not found
 */
function extractLocation(text) {
  if (!text) return null;
  
  // Look for location patterns after keywords
  for (const keyword of LOCATION_KEYWORDS) {
    const pattern = new RegExp(`${keyword}\\s+([\\w\\s]+)(?:,|\\.|$)`, 'i');
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  
  return null;
}

/**
 * Extract client name from text
 * @param {string} text - Text to extract client name from
 * @returns {string|null} - Extracted client name or null if not found
 */
function extractClientName(text) {
  if (!text) return null;
  
  // Look for patterns like "with [Name]" or "client: [Name]"
  const patterns = [
    /with\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
    /client:\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  
  return null;
}

/**
 * Categorize an expense based on its details
 * @param {Object} expense - Expense object with merchant, description, and comment
 * @returns {Object} - Categorized expense with category and details
 */
export function categorizeExpense(expense) {
  const description = expense.description?.toUpperCase() || '';
  const memo = expense.memo?.toUpperCase() || '';
  const combinedText = `${description} ${memo}`;
  
  // Check for specific categories first
  for (const [type, config] of Object.entries(CATEGORIES)) {
    if (config.keywords.some(keyword => combinedText.includes(keyword))) {
      return {
        category: config.category,
        details: config.details,
        confidence: 0.8,
        needs_review: 0
      };
    }
  }
  
  // If no specific category found, mark for review
  return {
    category: 'BD: Other Costs',
    details: 'Needs Classification',
    confidence: 0.3,
    needs_review: 1
  };
}

/**
 * Batch categorize expenses
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} - Array of categorized expenses
 */
export function batchCategorizeExpenses(expenses) {
  return expenses.map(expense => ({
    ...expense,
    ...categorizeExpense(expense)
  }));
} 