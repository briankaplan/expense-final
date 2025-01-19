export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/photoslibrary.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

export const GOOGLE_AUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  scopes: GOOGLE_SCOPES,
  accessType: 'offline',
  responseType: 'code',
  prompt: 'consent'
};

export const getGoogleAuthUrl = () => {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  
  const params = {
    client_id: GOOGLE_AUTH_CONFIG.clientId,
    redirect_uri: GOOGLE_AUTH_CONFIG.redirectUri,
    response_type: GOOGLE_AUTH_CONFIG.responseType,
    scope: GOOGLE_SCOPES.join(' '),
    access_type: GOOGLE_AUTH_CONFIG.accessType,
    prompt: GOOGLE_AUTH_CONFIG.prompt
  };

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};

export const handleGoogleCallback = async (code) => {
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_AUTH_CONFIG.clientId,
        client_secret: GOOGLE_AUTH_CONFIG.clientSecret,
        redirect_uri: GOOGLE_AUTH_CONFIG.redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const tokens = await tokenResponse.json();

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const userInfo = await userResponse.json();

    return {
      tokens,
      user: userInfo,
    };
  } catch (error) {
    console.error('OAuth callback error:', error);
    throw error;
  }
};

export const refreshGoogleToken = async (refreshToken) => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: GOOGLE_AUTH_CONFIG.clientId,
        client_secret: GOOGLE_AUTH_CONFIG.clientSecret,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const tokens = await response.json();
    return tokens;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}; 