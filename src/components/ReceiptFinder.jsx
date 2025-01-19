'use client';

import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, CheckCircle2, Loader2, X } from 'lucide-react';
import { PhotosAPI } from '../lib/photos-api';
import GooglePhotosSignIn from './GooglePhotosSignIn';

export default function ReceiptFinder({ onClose }) {
  const [status, setStatus] = useState('idle');
  const [messages, setMessages] = useState([]);
  const [autoSearch, setAutoSearch] = useState(true);
  const [lastSearchTime, setLastSearchTime] = useState(null);
  const [searchLocations, setSearchLocations] = useState([]);
  const [foundReceipts, setFoundReceipts] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);

  const addMessage = (content, type = 'info') => {
    const newMessage = {
      id: Date.now(),
      content,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleScreenshot = async () => {
    try {
      const response = await fetch('/api/screenshot', {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to capture screenshot');
      
      const data = await response.json();
      addMessage('Successfully captured and processed receipt from screenshot', 'success');
      
      // Refresh the list of found receipts
      await runReceiptFinder();
    } catch (error) {
      console.error('Screenshot error:', error);
      addMessage('Failed to capture screenshot. Please try again.', 'error');
    }
  };

  const handleAISuggestion = async (suggestion) => {
    if (suggestion.type === 'search') {
      addMessage(`Searching ${suggestion.location} for receipts...`, 'info');
      await searchLocation(suggestion.location, suggestion.query);
    }
  };

  const searchLocation = async (location, query = '') => {
    setCurrentLocation(location);
    addMessage(`Searching ${location}...`, 'info');

    try {
      let receipts = [];
      
      switch (location) {
        case 'Gmail':
          const emailResponse = await fetch('/api/search/gmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
          });
          if (!emailResponse.ok) throw new Error('Failed to search Gmail');
          receipts = await emailResponse.json();
          break;

        case 'Google Photos':
          const photosApi = new PhotosAPI();
          await photosApi.authenticate();
          receipts = await photosApi.searchPhotos(query);
          break;

        case 'iMessage':
          const imessageResponse = await fetch('/api/search/imessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
          });
          if (!imessageResponse.ok) throw new Error('Failed to search iMessage');
          receipts = await imessageResponse.json();
          break;

        default:
          throw new Error(`Unknown location: ${location}`);
      }

      if (receipts.length > 0) {
        // Create receipt records
        const createReceiptPromises = receipts.map(async receipt => {
          const formData = new FormData();
          formData.append('file', receipt.file);
          formData.append('source', location);
          formData.append('metadata', JSON.stringify({
            date: receipt.date,
            amount: receipt.amount,
            merchant: receipt.merchant,
            extractedData: receipt.extractedData
          }));

          const response = await fetch('/api/receipts', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error('Failed to create receipt');
          return response.json();
        });

        const createdReceipts = await Promise.all(createReceiptPromises);
        addMessage(`Found ${createdReceipts.length} potential receipt(s) in ${location}`, 'success');
        setFoundReceipts(prev => [...prev, ...createdReceipts]);
      } else {
        addMessage(`No receipts found in ${location}`, 'info');
      }

      setSearchLocations(prev => [...prev, location]);
    } catch (error) {
      console.error(`Error searching ${location}:`, error);
      addMessage(`Failed to search ${location}: ${error.message}`, 'error');
    } finally {
      setCurrentLocation(null);
    }
  };

  const runReceiptFinder = async () => {
    if (status === 'running') return;

    setStatus('running');
    setError(null);
    setSearchLocations([]);
    setFoundReceipts([]);
    
    addMessage('Starting receipt search...', 'info');

    try {
      // Search each location sequentially
      await searchLocation('Gmail');
      await searchLocation('Google Photos');
      await searchLocation('iMessage');

      setLastSearchTime(new Date());
      setStatus('idle');
      
      if (foundReceipts.length === 0) {
        addMessage('No receipts found in any location. Try using the AI assistant for help.', 'info');
      }
    } catch (error) {
      console.error('Receipt finder error:', error);
      setError(error.message);
      setStatus('error');
      addMessage(`Error during search: ${error.message}`, 'error');
    }
  };

  useEffect(() => {
    if (autoSearch) {
      runReceiptFinder();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#282828] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex">
        {/* Left Panel - Search Results */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/[0.06]">
          {/* Header */}
          <div className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-[#1DB954]" />
                <h2 className="text-lg font-semibold text-white">Receipt Finder</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>

          {/* Status and Controls */}
          <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={runReceiptFinder}
                disabled={status === 'running'}
                className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-black rounded-lg hover:bg-[#1ed760] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${status === 'running' ? 'animate-spin' : ''}`} />
                {status === 'running' ? 'Searching...' : 'Search Again'}
              </button>
              
              {lastSearchTime && (
                <span className="text-sm text-white/40">
                  Last search: {lastSearchTime.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Connected Services */}
          <div className="p-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-medium text-white/80 mb-3">Connected Services</h3>
            <div className="space-y-2">
              <GooglePhotosSignIn />
            </div>
          </div>

          {/* Search Progress */}
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {/* Search Locations */}
            <div className="space-y-2">
              {['Gmail', 'Google Photos', 'iMessage'].map(location => (
                <div
                  key={location}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]"
                >
                  {currentLocation === location ? (
                    <Loader2 className="w-5 h-5 text-[#1DB954] animate-spin" />
                  ) : searchLocations.includes(location) ? (
                    <CheckCircle2 className="w-5 h-5 text-[#1DB954]" />
                  ) : (
                    <div className="w-5 h-5" />
                  )}
                  <span className="text-white/80">{location}</span>
                </div>
              ))}
            </div>

            {/* Messages */}
            <div className="space-y-2">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.type === 'error'
                      ? 'bg-red-500/10 text-red-400'
                      : message.type === 'success'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-white/[0.03] text-white/60'
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Found Receipts */}
        <div className="w-96 flex flex-col min-w-0">
          <div className="p-4 border-b border-white/[0.06]">
            <h3 className="text-lg font-semibold text-white">Found Receipts</h3>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            {foundReceipts.length === 0 ? (
              <div className="text-center text-white/40 py-8">
                No receipts found yet
              </div>
            ) : (
              <div className="space-y-4">
                {foundReceipts.map(receipt => (
                  <div
                    key={receipt.id}
                    className="p-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">
                          {receipt.merchant || 'Unknown Merchant'}
                        </h4>
                        <p className="text-sm text-white/60">
                          {new Date(receipt.date).toLocaleDateString()}
                        </p>
                        {receipt.amount && (
                          <p className="text-sm text-white/60">
                            ${Math.abs(receipt.amount).toFixed(2)}
                          </p>
                        )}
                      </div>
                      <img
                        src={receipt.url}
                        alt="Receipt thumbnail"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 