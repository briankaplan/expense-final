import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';

export async function POST(request) {
  try {
    const { query = '' } = await request.json();

    // Call the iMessage search service
    const response = await fetch(`${env.API_URL}/api/search/imessage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        filters: {
          // Only search messages from the last 30 days
          dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date().toISOString()
          },
          // Only search messages with attachments
          hasAttachments: true,
          // Keywords that suggest a message might contain a receipt
          keywords: [
            'receipt',
            'invoice',
            'order',
            'confirmation',
            'purchase',
            'payment',
            'transaction'
          ]
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to search iMessage');
    }

    const messages = await response.json();

    // Process messages to extract receipt information
    const receipts = messages.map(message => {
      const attachments = message.attachments.filter(isLikelyReceipt);
      if (!attachments.length) return null;

      return {
        id: message.id,
        source: 'iMessage',
        from: message.sender,
        date: new Date(message.date),
        text: message.text,
        attachments: attachments.map(attachment => ({
          id: attachment.id,
          filename: attachment.filename,
          mimeType: attachment.mimeType,
          size: attachment.size,
          url: attachment.url
        })),
        confidence: calculateConfidence(message)
      };
    });

    // Filter out messages without receipts and sort by date
    const validReceipts = receipts
      .filter(Boolean)
      .sort((a, b) => b.date - a.date);

    return NextResponse.json(validReceipts);

  } catch (error) {
    console.error('iMessage search error:', error);
    return NextResponse.json(
      { error: 'Failed to search iMessage' },
      { status: 500 }
    );
  }
}

function isLikelyReceipt(attachment) {
  const { filename, mimeType } = attachment;
  
  // Check file extension
  const receiptExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.heic'];
  const hasReceiptExtension = receiptExtensions.some(ext => 
    filename.toLowerCase().endsWith(ext)
  );

  // Check MIME type
  const receiptMimeTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/heic'
  ];
  const hasReceiptMimeType = receiptMimeTypes.includes(mimeType);

  return hasReceiptExtension || hasReceiptMimeType;
}

function calculateConfidence(message) {
  let confidence = 0;

  // Check message text for receipt-related keywords
  const textKeywords = [
    'receipt',
    'invoice',
    'order',
    'confirmation',
    'purchase',
    'payment',
    'transaction',
    'total',
    'amount',
    'paid'
  ];

  const hasTextKeyword = textKeywords.some(keyword =>
    message.text.toLowerCase().includes(keyword)
  );
  if (hasTextKeyword) confidence += 0.4;

  // Check if message has image attachments
  const hasImageAttachments = message.attachments.some(attachment =>
    attachment.mimeType.startsWith('image/')
  );
  if (hasImageAttachments) confidence += 0.3;

  // Check if message is from a business number
  const isBusinessSender = message.sender.match(/[A-Za-z]/);
  if (isBusinessSender) confidence += 0.3;

  return Math.min(confidence, 1);
} 