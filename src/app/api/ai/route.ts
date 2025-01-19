import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { action, payload } = await request.json();
    
    switch (action) {
      case 'analyzeReceipt': {
        const { receiptText, expense } = payload;
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a receipt analysis expert. Analyze the receipt text and compare it with the expense details to determine if they match. Consider:
                1. Amount matching (exact or within reasonable range accounting for tips)
                2. Date matching (exact or within 1-2 days)
                3. Merchant name matching (exact or similar names)
                4. Type of purchase
                5. Location if available
                Return a JSON object with match confidence and reasoning.`
            },
            {
              role: "user",
              content: `Receipt Text: ${receiptText}\n\nExpense Details: ${JSON.stringify(expense, null, 2)}`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1
        });
        return NextResponse.json(JSON.parse(response.choices[0].message.content));
      }
      
      case 'learnMerchantPatterns': {
        const { merchant, successfulFinds } = payload;
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a pattern recognition expert. Analyze the successful receipt finds for a merchant and identify patterns in:
                1. Common receipt sources
                2. Email patterns
                3. Timing patterns
                4. Format patterns
                Return a JSON object with learned patterns and confidence scores.`
            },
            {
              role: "user",
              content: `Merchant: ${merchant}\nSuccessful Finds: ${JSON.stringify(successfulFinds, null, 2)}`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1
        });
        return NextResponse.json(JSON.parse(response.choices[0].message.content));
      }

      case 'suggestSearchStrategy': {
        const { expense, previousAttempts } = payload;
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a receipt finding strategist. Based on the expense details and previous search attempts, suggest the best strategy to find the receipt. Consider:
                1. Merchant type and typical receipt delivery methods
                2. Previous successful finds for similar merchants
                3. Failed attempts and why they might have failed
                4. Time sensitivity and likelihood of finding
                Return a JSON object with suggested search strategy and reasoning.`
            },
            {
              role: "user",
              content: `Expense: ${JSON.stringify(expense, null, 2)}\nPrevious Attempts: ${JSON.stringify(previousAttempts, null, 2)}`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1
        });
        return NextResponse.json(JSON.parse(response.choices[0].message.content));
      }

      case 'validateReceiptContent': {
        const { receiptText, expense } = payload;
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a receipt validation expert. Analyze the receipt text and validate its authenticity and relevance. Check for:
                1. Required receipt elements (date, amount, merchant, items)
                2. Consistency with expense details
                3. Potential red flags or missing information
                4. Quality of OCR text and needed corrections
                Return a JSON object with validation results and confidence score.`
            },
            {
              role: "user",
              content: `Receipt Text: ${receiptText}\nExpense Details: ${JSON.stringify(expense, null, 2)}`
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1
        });
        return NextResponse.json(JSON.parse(response.choices[0].message.content));
      }

      case 'enhanceOCRText': {
        const { ocrText } = payload;
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are an OCR enhancement expert. Clean and structure the OCR text by:
                1. Correcting common OCR errors
                2. Identifying and structuring key receipt elements
                3. Standardizing formats
                4. Extracting additional context
                Return a JSON object with enhanced text and structured data.`
            },
            {
              role: "user",
              content: ocrText
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1
        });
        return NextResponse.json(JSON.parse(response.choices[0].message.content));
      }
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
} 