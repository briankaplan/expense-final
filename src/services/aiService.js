class AIService {
  async analyzeReceipt(receiptText, expense) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'analyzeReceipt',
          payload: { receiptText, expense }
        })
      });

      if (!response.ok) {
        throw new Error('AI analysis failed');
      }

      return await response.json();
    } catch (error) {
      console.error('AI analysis error:', error);
      return null;
    }
  }

  async learnMerchantPatterns(merchant, successfulFinds) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'learnMerchantPatterns',
          payload: { merchant, successfulFinds }
        })
      });

      if (!response.ok) {
        throw new Error('AI learning failed');
      }

      return await response.json();
    } catch (error) {
      console.error('AI learning error:', error);
      return null;
    }
  }

  async suggestSearchStrategy(expense, previousAttempts) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'suggestSearchStrategy',
          payload: { expense, previousAttempts }
        })
      });

      if (!response.ok) {
        throw new Error('AI strategy failed');
      }

      return await response.json();
    } catch (error) {
      console.error('AI strategy error:', error);
      return null;
    }
  }

  async validateReceiptContent(receiptText, expense) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'validateReceiptContent',
          payload: { receiptText, expense }
        })
      });

      if (!response.ok) {
        throw new Error('AI validation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('AI validation error:', error);
      return null;
    }
  }

  async enhanceOCRText(ocrText) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'enhanceOCRText',
          payload: { ocrText }
        })
      });

      if (!response.ok) {
        throw new Error('AI OCR enhancement failed');
      }

      return await response.json();
    } catch (error) {
      console.error('AI OCR enhancement error:', error);
      return null;
    }
  }
}

export const aiService = new AIService(); 