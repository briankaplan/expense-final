import { NextResponse } from 'next/server';
import { gmailOAuth2Client } from '@/lib/googleAuth';
import { storeTokens } from '@/lib/googleAuth';
import { google } from 'googleapis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings?error=${error}`
    );
  }

  if (!code) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings?error=no_code`
    );
  }

  try {
    // Exchange code for tokens
    const { tokens } = await gmailOAuth2Client.getToken(code);
    gmailOAuth2Client.setCredentials(tokens);

    // Get user's email
    const gmail = google.gmail({ version: 'v1', auth: gmailOAuth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    const email = profile.data.emailAddress;

    if (!email) {
      throw new Error('Could not get user email');
    }

    // Store tokens
    await storeTokens({
      service: 'gmail',
      email,
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token!,
      expiry_date: tokens.expiry_date!
    });

    // Redirect back to settings with success
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings?service=gmail&status=success`
    );

  } catch (error) {
    console.error('Gmail callback error:', error);
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings?error=auth_failed`
    );
  }
} 