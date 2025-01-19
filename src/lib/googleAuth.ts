import { google } from 'googleapis';
import { encrypt, decrypt } from './encryption';

// Client configuration from the downloaded client secret file
const CLIENT_CONFIG = {
  client_id: "612778439696-t0mn0k1ub8kfovb73v03kmrohmi3iqhu.apps.googleusercontent.com",
  project_id: "gmail-447804",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
};

export interface GoogleTokens {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
  email?: string;
  service: 'gmail' | 'photos';
}

// Initialize the OAuth2 client
export const oauth2Client = new google.auth.OAuth2(
  CLIENT_CONFIG.client_id,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NODE_ENV === 'development' ? 'http:' : 'https:'}//${process.env.VERCEL_URL || 'localhost:3000'}/oauth2callback`
);

// Scopes we need for Google services
export const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/photoslibrary.readonly'
];

// Store tokens in memory for now (in production, you'd want to store these securely)
const tokenStore = new Map();

export async function storeTokens({ service, email, access_token, refresh_token, expiry_date }) {
  tokenStore.set(`${service}:${email}`, {
    access_token,
    refresh_token,
    expiry_date
  });
}

export async function getStoredTokens(service, email) {
  return tokenStore.get(`${service}:${email}`);
}

// Export the photos-specific OAuth2 client
export const photosOAuth2Client = new google.auth.OAuth2(
  CLIENT_CONFIG.client_id,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NODE_ENV === 'development' ? 'http:' : 'https:'}//${process.env.VERCEL_URL || 'localhost:3000'}/oauth2callback`
);

// Function to refresh tokens if expired
export async function refreshTokensIfNeeded(tokens: GoogleTokens): Promise<GoogleTokens> {
  const client = tokens.service === 'gmail' ? oauth2Client : photosOAuth2Client;
  client.setCredentials({
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token,
    expiry_date: tokens.expiry_date
  });

  // Check if token is expired or will expire in next 5 minutes
  const isExpired = tokens.expiry_date < Date.now() + 5 * 60 * 1000;

  if (isExpired) {
    try {
      const { credentials } = await client.refreshAccessToken();
      const refreshedTokens = {
        ...tokens,
        access_token: credentials.access_token || tokens.access_token,
        expiry_date: credentials.expiry_date || tokens.expiry_date
      };
      
      // Store refreshed tokens
      await storeTokens(refreshedTokens);
      return refreshedTokens;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  return tokens;
}

// Store tokens securely in D1
export async function storeTokens(tokens: GoogleTokens): Promise<void> {
  const encryptedTokens = encrypt(JSON.stringify({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiry_date: tokens.expiry_date
  }));

  const response = await fetch('/api/auth/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service: tokens.service,
      email: tokens.email,
      encrypted_tokens: encryptedTokens
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to store tokens');
  }
}

// Retrieve tokens from D1
export async function getStoredTokens(service: 'gmail' | 'photos', email: string): Promise<GoogleTokens | null> {
  const response = await fetch(`/api/auth/tokens?service=${service}&email=${email}`);
  
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  if (!data.encrypted_tokens) {
    return null;
  }

  const decrypted = JSON.parse(decrypt(data.encrypted_tokens));
  return {
    ...decrypted,
    email,
    service
  };
}

// Initialize APIs with refreshed tokens
export async function getGmailAPI(email: string) {
  const tokens = await getStoredTokens('gmail', email);
  if (!tokens) {
    throw new Error('No Gmail tokens found');
  }

  const refreshedTokens = await refreshTokensIfNeeded(tokens);
  oauth2Client.setCredentials({
    access_token: refreshedTokens.access_token,
    refresh_token: refreshedTokens.refresh_token,
    expiry_date: refreshedTokens.expiry_date
  });
  
  return {
    gmail: google.gmail({ version: 'v1', auth: oauth2Client }),
    tokens: refreshedTokens
  };
}

export async function getPhotosAPI(email: string) {
  const tokens = await getStoredTokens('photos', email);
  if (!tokens) {
    throw new Error('No Google Photos tokens found');
  }

  const refreshedTokens = await refreshTokensIfNeeded(tokens);
  photosOAuth2Client.setCredentials({
    access_token: refreshedTokens.access_token,
    refresh_token: refreshedTokens.refresh_token,
    expiry_date: refreshedTokens.expiry_date
  });
  
  return {
    photos: google.photoslibrary({ version: 'v1', auth: photosOAuth2Client }),
    tokens: refreshedTokens
  };
} 