import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { env } from '@/env.mjs';

const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI
);

export async function POST(request) {
  try {
    // Check if we have a stored token
    const tokens = await getStoredTokens();
    
    if (tokens) {
      oauth2Client.setCredentials(tokens);
      
      // Check if the token is expired and refresh if needed
      if (oauth2Client.isTokenExpiring()) {
        const { credentials } = await oauth2Client.refreshAccessToken();
        await storeTokens(credentials);
        return NextResponse.json({ accessToken: credentials.access_token });
      }
      
      return NextResponse.json({ accessToken: tokens.access_token });
    }

    // If no stored tokens, generate auth URL
    const scopes = [
      'https://www.googleapis.com/auth/photoslibrary.readonly',
      'https://www.googleapis.com/auth/photoslibrary.sharing'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });

    return NextResponse.json({ 
      needsAuth: true,
      authUrl
    });

  } catch (error) {
    console.error('Google Photos auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'No authorization code provided' },
        { status: 400 }
      );
    }

    const { tokens } = await oauth2Client.getToken(code);
    await storeTokens(tokens);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Google Photos token error:', error);
    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 }
    );
  }
}

// Helper functions to store and retrieve tokens
// In a production environment, these should use a secure storage solution
async function getStoredTokens() {
  try {
    const response = await fetch(`${env.API_URL}/api/auth/tokens?service=google-photos`, {
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

async function storeTokens(tokens) {
  try {
    await fetch(`${env.API_URL}/api/auth/tokens`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: 'google-photos',
        tokens
      })
    });
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
} 