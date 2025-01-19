'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OAuth2Callback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    console.log('OAuth callback received:', { code, error });

    if (window.opener) {
      console.log('Found opener window, sending message');
      window.opener.postMessage({
        type: 'GOOGLE_PHOTOS_AUTH',
        code,
        error
      }, '*');
      window.close();
    } else {
      console.log('No opener window found');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Authenticating...</h1>
        <p className="text-gray-400">You can close this window after authentication is complete.</p>
        <div className="mt-4 text-sm text-gray-500">
          {searchParams.get('error') ? (
            <p className="text-red-400">Error: {searchParams.get('error')}</p>
          ) : searchParams.get('code') ? (
            <p>Authorization code received</p>
          ) : (
            <p>Waiting for response...</p>
          )}
        </div>
      </div>
    </div>
  );
} 