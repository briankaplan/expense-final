import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { processReceiptWithOCR } from '@/services/ocrService';
import { uploadToR2 } from '@/services/storageService';
import { cookies } from 'next/headers';
import { decrypt } from '@/utils/encryption';

export async function POST(request) {
  try {
    const { expense, source } = await request.json();
    const cookieStore = cookies();
    
    // Get auth tokens from cookies
    const googleAuthCookie = cookieStore.get('google_auth');
    if (!googleAuthCookie) {
      return NextResponse.json({ error: 'Not authenticated with Google' }, { status: 401 });
    }

    // Decrypt and parse auth tokens
    const tokens = JSON.parse(decrypt(googleAuthCookie.value));
    
    // Initialize Google OAuth client
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    );
    oauth2Client.setCredentials(tokens);

    const results = [];
    const searchDate = new Date(expense.transaction_date);
    const dateRange = {
      start: new Date(searchDate.getTime() - (7 * 24 * 60 * 60 * 1000)), // 7 days before
      end: new Date(searchDate.getTime() + (7 * 24 * 60 * 60 * 1000))    // 7 days after
    };

    // Search Gmail if source is 'all' or 'gmail'
    if (source === 'all' || source === 'gmail') {
      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      
      // Search for emails around the transaction date containing receipt-related keywords
      const query = `{receipt OR invoice OR order} after:${dateRange.start.toISOString()} before:${dateRange.end.toISOString()}`;
      const emailResponse = await gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 10
      });

      if (emailResponse.data.messages) {
        for (const message of emailResponse.data.messages) {
          const email = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
            format: 'full'
          });

          const headers = email.data.payload.headers;
          const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
          const date = new Date(parseInt(email.data.internalDate));

          results.push({
            type: 'email',
            source: 'gmail',
            id: message.id,
            title: subject,
            date: date.toLocaleDateString(),
            url: `https://mail.google.com/mail/u/0/#inbox/${message.id}`,
            content: email.data.snippet
          });
        }
      }
    }

    // Search Google Photos if source is 'all' or 'photos'
    if (source === 'all' || source === 'photos') {
      const photos = google.photoslibrary({ version: 'v1', auth: oauth2Client });
      
      // Search for photos around the transaction date
      const filters = {
        dateFilter: {
          ranges: [{
            startDate: {
              year: dateRange.start.getFullYear(),
              month: dateRange.start.getMonth() + 1,
              day: dateRange.start.getDate()
            },
            endDate: {
              year: dateRange.end.getFullYear(),
              month: dateRange.end.getMonth() + 1,
              day: dateRange.end.getDate()
            }
          }]
        },
        contentFilter: {
          includedContentCategories: ['RECEIPTS']
        }
      };

      const photosResponse = await photos.mediaItems.search({
        requestBody: {
          filters,
          pageSize: 10
        }
      });

      if (photosResponse.data.mediaItems) {
        for (const item of photosResponse.data.mediaItems) {
          results.push({
            type: 'image',
            source: 'photos',
            id: item.id,
            title: item.filename,
            date: new Date(item.mediaMetadata.creationTime).toLocaleDateString(),
            url: item.baseUrl,
            width: item.mediaMetadata.width,
            height: item.mediaMetadata.height
          });
        }
      }
    }

    // Sort results by date proximity to the transaction date
    results.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const diffA = Math.abs(dateA - searchDate);
      const diffB = Math.abs(dateB - searchDate);
      return diffA - diffB;
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Receipt search error:', error);
    return NextResponse.json(
      { error: 'Failed to search for receipts' },
      { status: 500 }
    );
  }
}

// Helper function to handle file upload after finding a receipt
export async function PUT(request) {
  try {
    const { receiptData, expenseId } = await request.json();
    
    // Download the receipt image/file
    const response = await fetch(receiptData.metadata.url);
    const buffer = await response.arrayBuffer();
    
    // Upload to R2
    const r2Url = await uploadToR2(new Blob([buffer]), expenseId);
    
    return NextResponse.json({ url: r2Url });
  } catch (error) {
    console.error('Receipt upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 