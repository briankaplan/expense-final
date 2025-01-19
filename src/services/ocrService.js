import Tesseract from 'tesseract.js';

// Process image with multiple OCR engines
export const processReceiptWithOCR = async (imageFile) => {
  try {
    // Run OCR engines in parallel with preprocessing
    const [tesseractResult, easyOCRResult] = await Promise.all([
      processTesseract(imageFile, {
        preprocess: true,
        psm: 6, // Assume uniform text block
        oem: 3  // Default + LSTM
      }),
      processEasyOCR(imageFile, {
        preprocess: true,
        allowlist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$.,/-:'
      })
    ]);

    // Combine and validate results
    const combinedResult = await combineOCRResults([
      { source: 'tesseract', result: tesseractResult },
      { source: 'easyocr', result: easyOCRResult }
    ]);

    return combinedResult;
  } catch (error) {
    console.error('OCR processing error:', error);
    throw error;
  }
};

// Tesseract OCR processing with enhanced preprocessing
async function processTesseract(imageFile, options = {}) {
  const worker = await Tesseract.createWorker('eng');
  
  // Configure Tesseract for receipt recognition
  await worker.setParameters({
    tessedit_char_whitelist: options.allowlist || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$.,/-:',
    preserve_interword_spaces: '1',
    tessedit_pageseg_mode: options.psm || '6',
    tessedit_ocr_engine_mode: options.oem || '3',
    debug_file: '/dev/null',
    tessdata_dir: 'eng.traineddata'
  });

  // Process the image with preprocessing if enabled
  const result = await worker.recognize(imageFile, {
    rectangle: options.rectangle,
    rotateAuto: true,
    rotateRadians: options.rotate,
    preprocessParameters: {
      enhance: true,
      binarize: true,
      scale: 2.0,
      deskew: true
    }
  });

  await worker.terminate();

  return {
    text: result.data.text,
    confidence: result.data.confidence,
    words: result.data.words,
    lines: result.data.lines,
    blocks: result.data.blocks,
    symbols: result.data.symbols
  };
}

// EasyOCR processing with enhanced preprocessing
async function processEasyOCR(imageFile, options = {}) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('options', JSON.stringify({
      allowlist: options.allowlist,
      width_ths: 0.7,
      link_threshold: 0.4,
      mag_ratio: 1.5,
      slope_ths: 0.1,
      ycenter_ths: 0.5,
      height_ths: 0.5,
      preprocess: options.preprocess
    }));

    const response = await fetch('/api/ocr/easyocr', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('EasyOCR processing failed');
    }

    return await response.json();
  } catch (error) {
    console.error('EasyOCR error:', error);
    return null;
  }
}

// Combine results from multiple OCR engines with enhanced validation
async function combineOCRResults(results) {
  try {
    // Extract text content and metadata from each result
    const textResults = results.map(r => ({
      source: r.source,
      text: r.result.text,
      confidence: r.result.confidence,
      words: r.result.words || [],
      lines: r.result.lines || [],
      blocks: r.result.blocks || []
    }));

    // Use LLM to combine and validate results
    const response = await fetch('/api/ocr/combine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        results: textResults,
        options: {
          requireStructure: true,
          validateAmounts: true,
          validateDates: true,
          validateMerchant: true
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to combine OCR results');
    }

    const combinedResult = await response.json();
    
    // Parse the combined result with enhanced validation
    return parseReceiptText(combinedResult.text, {
      validateStructure: true,
      confidence: combinedResult.confidence,
      metadata: combinedResult.metadata
    });
  } catch (error) {
    console.error('Error combining OCR results:', error);
    // Fallback to highest confidence result with basic validation
    const bestResult = results.reduce((best, current) => 
      (current.result?.confidence || 0) > (best.result?.confidence || 0) ? current : best
    );
    return parseReceiptText(bestResult.result.text, {
      validateStructure: false,
      confidence: bestResult.result.confidence
    });
  }
}

// Enhanced receipt text parsing with validation
function parseReceiptText(text, options = {}) {
  const receiptData = {
    date: null,
    total: null,
    subtotal: null,
    tax: null,
    tip: null,
    merchant: null,
    items: [],
    raw_text: text,
    confidence: options.confidence,
    metadata: options.metadata || {}
  };

  const lines = text.split('\n');
  
  // Enhanced regular expressions
  const dateRegex = /(?:\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4})|(?:\w{3,9}\s+\d{1,2},?\s+\d{4})|(?:\d{1,2}\s+\w{3,9}\s+\d{4})/i;
  const totalRegex = /(?:(?:sub)?total|amount|sum|balance|due|charged)[^$\d]*[$]?\s*([\d,]+\.\d{2})/i;
  const subtotalRegex = /(?:subtotal|sub-total|sub total)[^$\d]*[$]?\s*([\d,]+\.\d{2})/i;
  const taxRegex = /(?:tax|vat|gst|hst)[^$\d]*[$]?\s*([\d,]+\.\d{2})/i;
  const tipRegex = /(?:tip|gratuity|service charge)[^$\d]*[$]?\s*([\d,]+\.\d{2})/i;
  const priceRegex = /[$]?\s*([\d,]+\.\d{2})/;
  const merchantRegex = /^[A-Z0-9\s&'.-]+$/;
  const itemRegex = /^(.+?)\s+[$]?\s*([\d,]+\.\d{2})\s*$/;

  // Process each line with context
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    // Look for date with validation
    if (!receiptData.date) {
      const dateMatch = trimmedLine.match(dateRegex);
      if (dateMatch) {
        const possibleDate = new Date(dateMatch[0]);
        if (!isNaN(possibleDate.getTime())) {
          receiptData.date = dateMatch[0];
        }
      }
    }

    // Look for amounts with validation
    if (!receiptData.subtotal) {
      const subtotalMatch = trimmedLine.match(subtotalRegex);
      if (subtotalMatch) {
        receiptData.subtotal = parseFloat(subtotalMatch[1].replace(/,/g, ''));
      }
    }

    if (!receiptData.tax) {
      const taxMatch = trimmedLine.match(taxRegex);
      if (taxMatch) {
        receiptData.tax = parseFloat(taxMatch[1].replace(/,/g, ''));
      }
    }

    if (!receiptData.tip) {
      const tipMatch = trimmedLine.match(tipRegex);
      if (tipMatch) {
        receiptData.tip = parseFloat(tipMatch[1].replace(/,/g, ''));
      }
    }

    if (!receiptData.total) {
      const totalMatch = trimmedLine.match(totalRegex);
      if (totalMatch) {
        const possibleTotal = parseFloat(totalMatch[1].replace(/,/g, ''));
        // Validate total against subtotal + tax + tip if available
        if (!receiptData.subtotal || 
            Math.abs(possibleTotal - (receiptData.subtotal + (receiptData.tax || 0) + (receiptData.tip || 0))) < 0.01) {
          receiptData.total = possibleTotal;
        }
      }
    }

    // Look for merchant name with validation
    if (!receiptData.merchant && index < 5) {
      const words = trimmedLine.split(/\s+/);
      const possibleMerchant = words.slice(0, 3).join(' ');
      if (merchantRegex.test(possibleMerchant) && possibleMerchant.length > 3) {
        receiptData.merchant = possibleMerchant;
      }
    }

    // Look for line items with enhanced parsing
    const itemMatch = trimmedLine.match(itemRegex);
    if (itemMatch) {
      const [, description, priceStr] = itemMatch;
      const price = parseFloat(priceStr.replace(/,/g, ''));
      
      // Validate item
      if (description && price > 0 && !totalRegex.test(trimmedLine.toLowerCase())) {
        receiptData.items.push({
          description: description.trim(),
          price,
          raw: trimmedLine,
          confidence: options.confidence
        });
      }
    }
  });

  // Validate structure if required
  if (options.validateStructure) {
    receiptData.isValid = Boolean(
      receiptData.date &&
      receiptData.total &&
      receiptData.merchant &&
      receiptData.items.length > 0
    );

    // Validate total matches sum of items + tax + tip
    const itemsTotal = receiptData.items.reduce((sum, item) => sum + item.price, 0);
    const calculatedTotal = itemsTotal + (receiptData.tax || 0) + (receiptData.tip || 0);
    receiptData.totalMatchesItems = Math.abs(calculatedTotal - receiptData.total) < 0.01;
  }

  return receiptData;
}

// Export the enhanced receipt matching function
export const matchReceiptToExpense = (receiptData, expenses) => {
  let bestMatch = null;
  let highestScore = 0;

  expenses.forEach(expense => {
    let score = 0;

    // Match by amount (highest weight - 50 points max)
    if (receiptData.total) {
      const amountDiff = Math.abs(expense.amount - receiptData.total);
      if (amountDiff < 0.01) score += 50;
      else if (amountDiff < 1) score += 40;
      else if (amountDiff < 5) score += 30;
      else if (amountDiff < 10) score += 20;
    }

    // Match by date (30 points max)
    if (receiptData.date && expense.transaction_date) {
      const receiptDate = new Date(receiptData.date);
      const expenseDate = new Date(expense.transaction_date);
      const daysDiff = Math.abs((receiptDate - expenseDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff < 1) score += 30;
      else if (daysDiff < 3) score += 20;
      else if (daysDiff < 7) score += 10;
    }

    // Match by merchant name (20 points max)
    if (receiptData.merchant && expense.merchant) {
      const similarity = calculateStringSimilarity(
        receiptData.merchant.toLowerCase(),
        expense.merchant.toLowerCase()
      );
      score += similarity * 20;
    }

    // Bonus points for additional validations
    if (receiptData.isValid) score += 5;
    if (receiptData.totalMatchesItems) score += 5;

    // Update best match if score is higher
    if (score > highestScore) {
      highestScore = score;
      bestMatch = {
        expense,
        confidence: score,
        receiptData
      };
    }
  });

  return bestMatch;
};

// String similarity calculation (Levenshtein distance based)
function calculateStringSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[str2.length][str1.length];
} 