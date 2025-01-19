import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { env } from '@/env.mjs';

const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI
);

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export async function POST(request) {
  try {
    const { query = '' } = await request.json();

    // Get stored tokens
    const tokens = await getStoredTokens();
    if (!tokens) {
      return NextResponse.json(
        { error: 'Not authenticated with Gmail' },
        { status: 401 }
      );
    }

    oauth2Client.setCredentials(tokens);

    // Build search query
    const searchQuery = buildSearchQuery(query);

    // Search for messages
    const { data: { messages = [] } } = await gmail.users.messages.list({
      userId: 'me',
      q: searchQuery,
      maxResults: 50
    });

    // Process messages in parallel
    const receipts = await Promise.all(
      messages.map(async ({ id }) => {
        try {
          const { data: message } = await gmail.users.messages.get({
            userId: 'me',
            id,
            format: 'full'
          });

          const attachments = await getAttachments(message);
          if (!attachments.length) return null;

          const headers = message.payload.headers;
          const subject = headers.find(h => h.name === 'Subject')?.value || '';
          const from = headers.find(h => h.name === 'From')?.value || '';
          const date = new Date(parseInt(message.internalDate));

          return {
            id: message.id,
            source: 'Gmail',
            subject,
            from,
            date,
            attachments,
            threadId: message.threadId,
            snippet: message.snippet,
            confidence: calculateConfidence(message, subject)
          };
        } catch (error) {
          console.warn(`Error processing message ${id}:`, error);
          return null;
        }
      })
    );

    // Filter out null results and sort by date
    const validReceipts = receipts
      .filter(Boolean)
      .sort((a, b) => b.date - a.date);

    return NextResponse.json(validReceipts);

  } catch (error) {
    console.error('Gmail search error:', error);
    return NextResponse.json(
      { error: 'Failed to search Gmail' },
      { status: 500 }
    );
  }
}

async function getAttachments(message) {
  const attachments = [];

  // Helper function to process parts recursively
  const processParts = async (parts) => {
    for (const part of parts) {
      if (part.filename && part.body.attachmentId) {
        // Check if it's likely a receipt
        if (isLikelyReceipt(part)) {
          try {
            const { data: attachment } = await gmail.users.messages.attachments.get({
              userId: 'me',
              messageId: message.id,
              id: part.body.attachmentId
            });

            attachments.push({
              filename: part.filename,
              mimeType: part.mimeType,
              size: part.body.size,
              data: attachment.data
            });
          } catch (error) {
            console.warn(`Error getting attachment ${part.filename}:`, error);
          }
        }
      }

      // Recursively process nested parts
      if (part.parts) {
        await processParts(part.parts);
      }
    }
  };

  if (message.payload.parts) {
    await processParts(message.payload.parts);
  }

  return attachments;
}

function isLikelyReceipt(attachment) {
  const { filename, mimeType } = attachment;
  
  // Check file extension
  const receiptExtensions = ['.pdf', '.png', '.jpg', '.jpeg'];
  const hasReceiptExtension = receiptExtensions.some(ext => 
    filename.toLowerCase().endsWith(ext)
  );

  // Check MIME type
  const receiptMimeTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg'
  ];
  const hasReceiptMimeType = receiptMimeTypes.includes(mimeType);

  // Check filename keywords
  const receiptKeywords = ['receipt', 'invoice', 'order', 'confirmation'];
  const hasReceiptKeyword = receiptKeywords.some(keyword =>
    filename.toLowerCase().includes(keyword)
  );

  return (hasReceiptExtension || hasReceiptMimeType) && hasReceiptKeyword;
}

function buildSearchQuery(userQuery = '') {
  const baseQuery = 'has:attachment';
  const dateRange = 'newer_than:30d'; // Limit to last 30 days
  
  // Keywords that suggest an email might contain a receipt
  const receiptKeywords = [
    'receipt',
    'invoice',
    'order confirmation',
    'purchase',
    'transaction',
    'payment'
  ];

  // Combine user query with receipt keywords
  const keywordQuery = receiptKeywords
    .map(keyword => `(${keyword})`)
    .join(' OR ');

  // Build final query
  let finalQuery = `${baseQuery} (${keywordQuery})`;
  
  // Add user's query if provided
  if (userQuery.trim()) {
    finalQuery = `${finalQuery} (${userQuery})`;
  }

  // Add date range
  finalQuery = `${finalQuery} ${dateRange}`;

  return finalQuery;
}

function calculateConfidence(message, subject) {
  let confidence = 0;

  // Check subject line for receipt-related keywords
  const subjectKeywords = ['receipt', 'invoice', 'order', 'confirmation', 'purchase'];
  const hasSubjectKeyword = subjectKeywords.some(keyword =>
    subject.toLowerCase().includes(keyword)
  );
  if (hasSubjectKeyword) confidence += 0.3;

  // Check message body for receipt-related content
  const bodyKeywords = ['total', 'amount', 'paid', 'payment', 'transaction'];
  const hasBodyKeyword = bodyKeywords.some(keyword =>
    message.snippet.toLowerCase().includes(keyword)
  );
  if (hasBodyKeyword) confidence += 0.2;

  // Check for PDF or image attachments
  const hasAttachments = message.payload.parts?.some(part => 
    part.filename && (
      part.mimeType === 'application/pdf' ||
      part.mimeType.startsWith('image/')
    )
  );
  if (hasAttachments) confidence += 0.3;

  // Check sender domain
  const fromHeader = message.payload.headers.find(h => h.name === 'From')?.value || '';
  const commonReceiptDomains = [
    'receipt',
    'invoice',
    'order',
    'purchase',
    'transaction',
    'store',
    'shop'
  ];
  const hasDomainKeyword = commonReceiptDomains.some(keyword =>
    fromHeader.toLowerCase().includes(keyword)
  );
  if (hasDomainKeyword) confidence += 0.2;

  return Math.min(confidence, 1);
}

// Helper functions to store and retrieve tokens
async function getStoredTokens() {
  try {
    const response = await fetch(`${env.API_URL}/api/auth/tokens?service=gmail`, {
      headers: {
        'Authorization': `Bearer ${env.API_KEY}`
      }
    });

    if (!response.ok) return null;

    const { tokens } = await response.json();
    return tokens;
  } catch (error) {
    console.error('Error getting stored tokens:', error);
    return null;
  }
} 