import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    // Analyze the message to determine intent
    const analysis = await analyzeMessage(message);

    // Generate appropriate response based on intent
    const response = await generateResponse(analysis);

    return NextResponse.json(response);

  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

async function analyzeMessage(message) {
  const prompt = `
    Analyze the following message from a user looking for a receipt:
    "${message}"

    Determine:
    1. What type of receipt they're looking for
    2. Any relevant dates or time periods
    3. Any mentioned locations or sources
    4. Any specific details about the purchase
    5. The best approach to help them find it

    Format the response as JSON with the following fields:
    {
      "intent": "search" | "screenshot" | "general",
      "details": {
        "type": string,
        "date": string | null,
        "location": string | null,
        "amount": string | null,
        "merchant": string | null,
        "keywords": string[]
      },
      "approach": string
    }
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an AI assistant helping users find receipts for their expenses.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(completion.choices[0].message.content);
}

async function generateResponse(analysis) {
  switch (analysis.intent) {
    case 'search':
      // Return a suggestion for where to search
      return {
        type: 'suggestion',
        message: generateSearchMessage(analysis),
        suggestion: {
          type: 'search',
          location: analysis.details.location || determineSearchLocation(analysis),
          query: buildSearchQuery(analysis)
        }
      };

    case 'screenshot':
      // Return instructions for taking a screenshot
      return {
        type: 'screenshot',
        message: "I can help you capture that receipt. Click the camera button when you're ready, and I'll process the screenshot for you."
      };

    default:
      // Generate a helpful general response
      const prompt = `
        Given this analysis of a user's receipt request:
        ${JSON.stringify(analysis)}

        Generate a helpful response that:
        1. Acknowledges their request
        2. Provides specific suggestions
        3. Explains what actions they can take
        4. Maintains a friendly, professional tone

        Keep the response concise and actionable.
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant helping users find receipts for their expenses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      return {
        type: 'message',
        message: completion.choices[0].message.content
      };
  }
}

function generateSearchMessage(analysis) {
  const { details, approach } = analysis;
  
  if (details.location) {
    return `I'll search ${details.location} for your receipt${
      details.date ? ` from ${details.date}` : ''
    }${
      details.merchant ? ` from ${details.merchant}` : ''
    }. ${approach}`;
  }

  const location = determineSearchLocation(analysis);
  return `Based on your request, I'll search ${location} first${
    details.date ? ` for receipts from ${details.date}` : ''
  }. ${approach}`;
}

function determineSearchLocation(analysis) {
  const { details } = analysis;

  // If it's a recent purchase, try Gmail first
  if (details.date && isWithinLast30Days(details.date)) {
    return 'Gmail';
  }

  // If it's a restaurant or retail purchase, try Google Photos
  if (details.type && ['restaurant', 'retail', 'store'].includes(details.type.toLowerCase())) {
    return 'Google Photos';
  }

  // Default to Gmail as it's most likely to have digital receipts
  return 'Gmail';
}

function buildSearchQuery(analysis) {
  const { details } = analysis;
  const terms = [];

  if (details.merchant) {
    terms.push(details.merchant);
  }

  if (details.amount) {
    terms.push(details.amount);
  }

  if (details.type) {
    terms.push(details.type);
  }

  if (details.keywords) {
    terms.push(...details.keywords);
  }

  return terms.join(' ');
}

function isWithinLast30Days(dateStr) {
  const date = new Date(dateStr);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return date >= thirtyDaysAgo;
} 