import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { results } = await request.json();

    if (!results || !Array.isArray(results)) {
      return NextResponse.json({ error: 'Invalid results format' }, { status: 400 });
    }

    // Prepare the prompt for the LLM
    const prompt = `You are a receipt OCR validation system. Your task is to analyze and combine multiple OCR results from different engines to produce the most accurate representation of a receipt.

Input OCR Results:
${results.map(r => `Source: ${r.source}
Confidence: ${r.confidence}
Text:
${r.text}
---`).join('\n')}

Please analyze these results and:
1. Identify and correct any obvious OCR errors
2. Combine the results to produce the most accurate version
3. Ensure the output maintains the receipt's structure
4. Pay special attention to:
   - Date formats
   - Currency amounts
   - Merchant names
   - Line items
   - Totals

Output the combined and corrected text in a clear, structured format.`;

    // Call the LLM
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a receipt OCR validation system that combines and corrects OCR results."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    // Extract the combined result
    const combinedText = completion.choices[0].message.content;

    // Calculate confidence based on input confidences and LLM certainty
    const avgConfidence = results.reduce((sum, r) => sum + (r.confidence || 0), 0) / results.length;

    return NextResponse.json({
      text: combinedText,
      confidence: avgConfidence,
      sources: results.map(r => r.source)
    });
  } catch (error) {
    console.error('OCR combination error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 