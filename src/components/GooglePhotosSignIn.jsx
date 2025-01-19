'use client';

import { useState } from 'react';

export default function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the auth URL
      const response = await fetch('/api/auth/google');
      const data = await response.json();
      
      console.log('Auth response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get authentication URL');
      }

      if (!data.authUrl) {
        console.error('No auth URL in response:', data);
        throw new Error('Authentication URL not received from server');
      }

      // Open the auth URL in a popup
      const width = 600;
      const height = 800;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        data.authUrl,
        'Google Sign In',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
      );

      if (!popup) {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      }

      // Listen for the callback
      const messageHandler = async (event) => {
        console.log('Received message:', event.data);
        
        if (event.data.type === 'GOOGLE_AUTH') {
          window.removeEventListener('message', messageHandler);
          
          if (event.data.error) {
            throw new Error(`Authentication failed: ${event.data.error}`);
          }

          const { code } = event.data;
          if (!code) {
            throw new Error('No authorization code received');
          }
          
          // Exchange the code for tokens
          const tokenResponse = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
          });

          const tokenData = await tokenResponse.json();
          console.log('Token response:', tokenData);

          if (!tokenResponse.ok) {
            throw new Error(tokenData.error || 'Failed to authenticate with Google');
          }

          console.log('Token exchange successful:', tokenData);

          // Refresh the page or update the UI as needed
          window.location.reload();
        }
      };

      window.addEventListener('message', messageHandler);

    } catch (err) {
      console.error('Google sign in error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" 
              fill="#FFF"
            />
            <path 
              d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" 
              fill="#FFF"
            />
          </svg>
        )}
        {isLoading ? 'Connecting...' : 'Connect with Google'}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
} 