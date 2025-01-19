import { NextResponse } from 'next/server';
import { photosOAuth2Client } from '@/lib/googleAuth';
import { storeTokens } from '@/lib/googleAuth';
import { google } from 'googleapis';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  // Create an HTML response that posts the result to the parent window
  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'GOOGLE_PHOTOS_AUTH',
              code: ${JSON.stringify(code)},
              error: ${JSON.stringify(error)}
            }, '*');
            window.close();
          }
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 