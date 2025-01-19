// Configuration for merchant-specific receipt sources and rules
export const merchantSources = {
  // Known email sources
  'Metropolis': {
    type: 'email',
    source: 'gmail',
    account: 'kaplan.brian@gmail.com',
    searchTerms: ['receipt', 'order confirmation'],
    emailPattern: /from:metropolis.*receipt/i
  },
  'Uber': {
    type: 'email',
    source: 'gmail',
    account: 'brian@downhome.com',
    searchTerms: ['receipt', 'trip'],
    emailPattern: /from:uber.*receipt/i
  },
  
  // Manual screenshot required
  'Spotify': {
    type: 'manual_screenshot',
    frequency: 'monthly',
    instructions: 'Screenshot required from Spotify account page',
    url: 'https://www.spotify.com/account/subscription'
  },
  'Amazon Prime': {
    type: 'manual_screenshot',
    frequency: 'monthly',
    instructions: 'Screenshot required from Amazon Prime Membership page',
    url: 'https://www.amazon.com/gp/primecentral'
  },

  // SMS/Text message sources
  'ParkHappy': {
    type: 'sms',
    source: 'messages',
    linkPattern: /parkhappy\.com\/receipt/i,
    extractMethod: 'link_follow'
  },

  // Physical receipts likely in specific locations
  'Restaurant Receipts': {
    type: 'multi_source',
    sources: [
      {
        type: 'photos',
        source: 'google_photos',
        searchTerms: ['receipt'],
        dateRange: { before: 2, after: 2 }, // days
        requiresReview: true,
        reviewPrompt: 'Check tip amount and total'
      },
      {
        type: 'physical',
        locations: ['desk drawer', 'wallet'],
        promptUser: true
      }
    ]
  }
};

// Receipt source priorities
export const sourcePriorities = [
  'email',
  'sms',
  'photos',
  'manual_screenshot',
  'physical'
];

// Learning rules for new merchants
export const merchantLearningRules = {
  // When a receipt is found for a new merchant, record the source
  recordSuccessfulSource: true,
  
  // Number of successful finds needed to establish a pattern
  patternThreshold: 3,
  
  // Confidence scoring for source matching
  confidenceScoring: {
    exact_merchant_match: 1.0,
    similar_merchant_name: 0.8,
    same_category: 0.6,
    same_amount_range: 0.4
  }
}; 