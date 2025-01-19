import { NextResponse } from 'next/server';
import { handleGoogleCallback } from '@/config/oauth';
import { cookies } from 'next/headers';
import { encrypt } from '@/utils/encryption';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect(new URL('/auth/error?error=no_code', request.url));
    }

    // Exchange code for tokens
    const { tokens, user } = await handleGoogleCallback(code);

    // Encrypt sensitive data before storing in cookie
    const encryptedTokens = encrypt(JSON.stringify({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: Date.now() + tokens.expires_in * 1000
    }));

    // Store tokens in HTTP-only cookie
    cookies().set('google_auth', encryptedTokens, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    // Store user info in a separate cookie
    cookies().set('google_user', JSON.stringify({
      email: user.email,
      name: user.name,
      picture: user.picture
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    // Redirect back to the app
    return NextResponse.redirect(new URL('/expenses', request.url));
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.redirect(
      new URL(`/auth/error?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
} 