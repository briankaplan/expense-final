import { NextResponse } from 'next/server';
import { oauth2Client, SCOPES, storeTokens } from '@/lib/googleAuth';
import { google } from 'googleapis';

export async function GET() {
  try {
    // Log configuration for debugging
    console.log('OAuth2 Config:', {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      scopes: SCOPES
    });

    // Generate the auth URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent',
      include_granted_scopes: true
    });

    console.log('Generated auth URL:', authUrl);
    
    if (!authUrl) {
      throw new Error('Failed to generate authentication URL');
    }

    return NextResponse.json({ authUrl });
  } catch (error: any) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication URL', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user's email using OAuth2 userinfo
    const oauth2Api = google.oauth2('v2');
    const userInfo = await oauth2Api.userinfo.get({ auth: oauth2Client });
    const email = userInfo.data.email;

    if (!email) {
      throw new Error('Could not get user email');
    }

    // Store tokens
    await storeTokens({
      service: 'google',
      email,
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token!,
      expiry_date: tokens.expiry_date!
    });

    return NextResponse.json({ 
      success: true,
      email,
      access_token: tokens.access_token
    });

  } catch (error: any) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate with Google' },
      { status: 500 }
    );
  }
} 