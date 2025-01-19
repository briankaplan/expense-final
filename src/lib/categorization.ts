// Categorization rules for expenses
interface CategoryRule {
  category: string;
  details: string;
  confidence: number;
  patterns: {
    merchant?: RegExp[];
    description?: RegExp[];
  };
}

const CATEGORY_RULES: CategoryRule[] = [
  {
    category: 'BD: Travel',
    details: 'Parking',
    confidence: 0.9,
    patterns: {
      merchant: [/parking/i, /garage/i, /park/i],
      description: [/parking/i, /garage/i]
    }
  },
  {
    category: 'BD: Travel',
    details: 'Travel Expense',
    confidence: 0.9,
    patterns: {
      merchant: [/airline/i, /flight/i, /hotel/i, /uber/i, /lyft/i, /taxi/i],
      description: [/travel/i, /flight/i, /hotel/i, /transportation/i]
    }
  },
  {
    category: 'BD: Meals & Entertainment',
    details: 'Restaurant/Dining',
    confidence: 0.85,
    patterns: {
      merchant: [/restaurant/i, /cafe/i, /coffee/i, /dining/i, /grill/i, /kitchen/i],
      description: [/meal/i, /dinner/i, /lunch/i, /breakfast/i]
    }
  },
  {
    category: 'BD: Software & Services',
    details: 'Software Subscription',
    confidence: 0.95,
    patterns: {
      merchant: [/github/i, /atlassian/i, /aws/i, /google/i, /microsoft/i, /zoom/i, /slack/i],
      description: [/subscription/i, /license/i, /service/i]
    }
  },
  {
    category: 'BD: Software & Services',
    details: 'Hosting & Infrastructure',
    confidence: 0.95,
    patterns: {
      merchant: [/cloudflare/i, /aws/i, /azure/i, /google cloud/i, /digitalocean/i],
      description: [/hosting/i, /server/i, /cloud/i, /infrastructure/i]
    }
  },
  {
    category: 'BD: Office Supplies',
    details: 'Office Materials',
    confidence: 0.8,
    patterns: {
      merchant: [/staples/i, /office depot/i, /amazon/i],
      description: [/supplies/i, /office/i, /paper/i, /printer/i]
    }
  },
  {
    category: 'BD: Client Entertainment',
    details: 'Business Meeting',
    confidence: 0.8,
    patterns: {
      description: [/client/i, /meeting/i, /business/i]
    }
  },
  {
    category: 'BD: Team Events',
    details: 'Team Activity',
    confidence: 0.9,
    patterns: {
      description: [/team/i, /staff/i, /employee/i, /company/i]
    }
  },
  {
    category: 'BD: Marketing',
    details: 'Advertising',
    confidence: 0.85,
    patterns: {
      merchant: [/facebook/i, /meta/i, /google ads/i, /linkedin/i],
      description: [/advertising/i, /marketing/i, /promotion/i]
    }
  }
];

export interface Categorization {
  category: string;
  details: string;
  confidence: number;
}

export function categorizeExpense(merchant: string, description: string): Categorization {
  let bestMatch: CategoryRule | null = null;
  let highestConfidence = 0;

  for (const rule of CATEGORY_RULES) {
    let matchConfidence = 0;
    let matches = 0;
    let patterns = 0;

    // Check merchant patterns
    if (rule.patterns.merchant) {
      patterns += rule.patterns.merchant.length;
      for (const pattern of rule.patterns.merchant) {
        if (pattern.test(merchant)) {
          matches++;
        }
      }
    }

    // Check description patterns
    if (rule.patterns.description) {
      patterns += rule.patterns.description.length;
      for (const pattern of rule.patterns.description) {
        if (pattern.test(description)) {
          matches++;
        }
      }
    }

    if (matches > 0) {
      matchConfidence = (matches / patterns) * rule.confidence;
      if (matchConfidence > highestConfidence) {
        highestConfidence = matchConfidence;
        bestMatch = rule;
      }
    }
  }

  if (bestMatch && highestConfidence > 0.5) {
    return {
      category: bestMatch.category,
      details: bestMatch.details,
      confidence: highestConfidence
    };
  }

  // Default categorization if no match found
  return {
    category: 'BD: Other Costs',
    details: 'Needs Classification',
    confidence: 0
  };
} 