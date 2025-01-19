import { merchantSources, sourcePriorities, merchantLearningRules } from '@/config/merchantSources';
import { aiService } from './aiService';

class ReceiptFinderService {
  constructor() {
    this.learningData = new Map(); // Store learned patterns
    this.pendingTasks = new Map(); // Track ongoing searches
    this.searchHistory = new Map(); // Track search attempts and results
  }

  // Main method to find receipts for missing expenses
  async findReceipts(expenses) {
    const results = {
      found: [],
      pending: [],
      manual: [],
      notFound: []
    };

    for (const expense of expenses) {
      // Get AI-suggested search strategy
      const previousAttempts = this.searchHistory.get(expense.id) || [];
      const strategy = await aiService.suggestSearchStrategy(expense, previousAttempts);
      
      if (strategy?.recommendedSource) {
        // Use AI-recommended search strategy
        const searchPlan = await this.createSearchPlan(expense, {
          type: strategy.recommendedSource,
          confidence: strategy.confidence,
          ...strategy.sourceConfig
        });
        
        const result = await this.executeSearchPlan(expense, searchPlan);
        this.categorizeResult(result, results);
      } else {
        // Fall back to standard search
        const merchantConfig = this.getMerchantConfig(expense.merchant);
        const searchPlan = await this.createSearchPlan(expense, merchantConfig);
        
        if (searchPlan.type === 'automated') {
          const result = await this.executeSearchPlan(expense, searchPlan);
          this.categorizeResult(result, results);
        } else {
          results.manual.push({
            expense,
            instructions: searchPlan.instructions
          });
        }
      }
    }

    return results;
  }

  // Get merchant configuration, including learned patterns
  getMerchantConfig(merchantName) {
    let config = merchantSources[merchantName];
    
    // Check learned patterns if no direct config exists
    if (!config && this.learningData.has(merchantName)) {
      const learnedPattern = this.learningData.get(merchantName);
      if (learnedPattern.confidence >= 0.8) {
        config = learnedPattern.config;
      }
    }

    return config;
  }

  // Create a search plan based on merchant and expense details
  async createSearchPlan(expense, merchantConfig) {
    if (!merchantConfig) {
      // Try to infer source based on similar merchants
      const inferredSource = await this.inferReceiptSource(expense);
      if (inferredSource) {
        return {
          type: 'automated',
          sources: [inferredSource],
          confidence: inferredSource.confidence
        };
      }
      
      // Default to checking common sources
      return {
        type: 'automated',
        sources: sourcePriorities.map(source => ({
          type: source,
          confidence: 0.3
        }))
      };
    }

    if (merchantConfig.type === 'manual_screenshot') {
      return {
        type: 'manual',
        instructions: merchantConfig.instructions,
        url: merchantConfig.url
      };
    }

    if (merchantConfig.type === 'multi_source') {
      return {
        type: 'automated',
        sources: merchantConfig.sources,
        requiresReview: merchantConfig.sources.some(s => s.requiresReview)
      };
    }

    return {
      type: 'automated',
      sources: [merchantConfig]
    };
  }

  // Execute the search plan with AI validation
  async executeSearchPlan(expense, searchPlan) {
    const result = {
      expense,
      searchPlan,
      status: 'pending',
      attempts: []
    };

    for (const source of searchPlan.sources) {
      try {
        const searchResult = await this.searchSource(expense, source);
        result.attempts.push(searchResult);

        if (searchResult.found) {
          // Validate and enhance receipt content with AI
          const enhancedText = await aiService.enhanceOCRText(searchResult.receipt.text);
          const validation = await aiService.validateReceiptContent(
            enhancedText?.enhancedText || searchResult.receipt.text,
            expense
          );

          if (validation?.isValid && validation?.confidence > 0.8) {
            result.status = 'found';
            result.receipt = {
              ...searchResult.receipt,
              text: enhancedText?.enhancedText || searchResult.receipt.text,
              structuredData: enhancedText?.structuredData,
              validation
            };
            
            // Update learning data with AI analysis
            const patterns = await aiService.learnMerchantPatterns(
              expense.merchant,
              [...(this.learningData.get(expense.merchant)?.patterns || []), searchResult]
            );
            
            if (patterns) {
              this.updateLearningData(expense.merchant, {
                ...source,
                aiPatterns: patterns
              });
            }
            
            break;
          } else {
            console.log('Receipt validation failed:', validation);
          }
        }
      } catch (error) {
        console.error(`Search error for ${expense.merchant}:`, error);
        result.attempts.push({
          source,
          error: error.message
        });
      }
    }

    if (result.status === 'pending') {
      result.status = 'not_found';
    }

    // Update search history
    this.searchHistory.set(expense.id, [
      ...(this.searchHistory.get(expense.id) || []),
      {
        timestamp: new Date(),
        result: result.status,
        attempts: result.attempts
      }
    ]);

    return result;
  }

  // Search a specific source for receipts
  async searchSource(expense, source) {
    // Implementation will vary based on source type
    switch (source.type) {
      case 'email':
        return await this.searchEmail(expense, source);
      case 'sms':
        return await this.searchSMS(expense, source);
      case 'photos':
        return await this.searchPhotos(expense, source);
      default:
        throw new Error(`Unsupported source type: ${source.type}`);
    }
  }

  // Update learning data based on successful finds
  updateLearningData(merchantName, successfulSource) {
    const currentData = this.learningData.get(merchantName) || {
      patterns: [],
      confidence: 0
    };

    currentData.patterns.push(successfulSource);
    
    if (currentData.patterns.length >= merchantLearningRules.patternThreshold) {
      // Calculate confidence based on pattern consistency
      const sourceCounts = currentData.patterns.reduce((acc, pattern) => {
        acc[pattern.type] = (acc[pattern.type] || 0) + 1;
        return acc;
      }, {});

      const mostCommonSource = Object.entries(sourceCounts)
        .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

      const confidence = sourceCounts[mostCommonSource] / currentData.patterns.length;
      
      currentData.confidence = confidence;
      currentData.config = {
        type: mostCommonSource,
        ...currentData.patterns.find(p => p.type === mostCommonSource)
      };
    }

    this.learningData.set(merchantName, currentData);
  }

  // Infer receipt source for unknown merchants
  async inferReceiptSource(expense) {
    // Look for similar merchants in learning data
    const similarMerchants = Array.from(this.learningData.entries())
      .map(([merchant, data]) => ({
        merchant,
        similarity: this.calculateMerchantSimilarity(expense.merchant, merchant),
        data
      }))
      .filter(m => m.similarity > 0.6)
      .sort((a, b) => b.similarity - a.similarity);

    if (similarMerchants.length > 0) {
      const bestMatch = similarMerchants[0];
      return {
        ...bestMatch.data.config,
        confidence: bestMatch.similarity * bestMatch.data.confidence
      };
    }

    return null;
  }

  // Enhanced merchant similarity calculation using AI
  async calculateMerchantSimilarity(merchant1, merchant2) {
    try {
      const response = await aiService.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Compare these two merchant names and return a similarity score between 0 and 1, considering:
              1. Name variations (e.g., "McDonald's" vs "MCDONALDS")
              2. Common abbreviations
              3. Parent company relationships
              4. Brand variations
              Return just the number.`
          },
          {
            role: "user",
            content: `Merchant 1: ${merchant1}\nMerchant 2: ${merchant2}`
          }
        ],
        temperature: 0.1
      });

      const similarity = parseFloat(response.choices[0].message.content);
      return isNaN(similarity) ? 0 : similarity;
    } catch (error) {
      console.error('AI similarity calculation error:', error);
      // Fall back to basic comparison
      const normalize = str => str.toLowerCase().replace(/[^a-z0-9]/g, '');
      const m1 = normalize(merchant1);
      const m2 = normalize(merchant2);
      
      if (m1 === m2) return 1;
      if (m1.includes(m2) || m2.includes(m1)) return 0.8;
      return 0;
    }
  }

  // Categorize search results
  categorizeResult(result, results) {
    switch (result.status) {
      case 'found':
        results.found.push(result);
        break;
      case 'pending':
        results.pending.push(result);
        break;
      case 'not_found':
        results.notFound.push(result);
        break;
    }
  }

  // Get status report
  getStatusReport() {
    return {
      pendingTasks: Array.from(this.pendingTasks.values()),
      learningProgress: Array.from(this.learningData.entries())
        .map(([merchant, data]) => ({
          merchant,
          confidence: data.confidence,
          learnedPattern: data.config
        })),
      searchHistory: Array.from(this.searchHistory.entries())
    };
  }
}

export const receiptFinderService = new ReceiptFinderService(); 