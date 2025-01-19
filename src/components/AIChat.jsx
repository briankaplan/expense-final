'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, Camera } from 'lucide-react';

export function AIChat({ onScreenshot, onSuggestion }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatRef = useRef(null);

  const addMessage = (content, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      content,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    addMessage(userMessage, 'user');
    setIsThinking(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();
      
      // Handle different types of AI responses
      if (data.type === 'suggestion') {
        addMessage(data.message, 'assistant');
        if (onSuggestion) onSuggestion(data.suggestion);
      } else if (data.type === 'screenshot') {
        addMessage('I can help you capture that receipt. Click the camera button when ready.', 'assistant');
      } else {
        addMessage(data.message, 'assistant');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#282828] rounded-lg border border-white/[0.06] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
        <Bot className="w-5 h-5 text-[#1DB954]" />
        <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
      </div>

      {/* Chat Messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex items-start gap-3 text-white/60">
            <Bot className="w-5 h-5 mt-1" />
            <div>
              <p>Hi! I can help you find receipts by:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Searching your Gmail and Google Photos</li>
                <li>Capturing receipts from websites</li>
                <li>Checking your iMessage history</li>
                <li>Suggesting where to look based on the expense</li>
              </ul>
            </div>
          </div>
        )}

        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex items-start gap-3 ${
              message.type === 'assistant' ? 'text-white/80' : 'text-white'
            }`}
          >
            {message.type === 'assistant' ? (
              <Bot className="w-5 h-5 mt-1" />
            ) : (
              <User className="w-5 h-5 mt-1" />
            )}
            <div className="flex-1">
              <p className="leading-relaxed">{message.content}</p>
              <span className="text-xs text-white/40 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-3 text-white/40">
            <Bot className="w-5 h-5" />
            <div className="flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>•</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about finding receipts..."
              className="w-full bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#1DB954] resize-none"
              rows="1"
            />
          </div>
          <button
            onClick={() => onScreenshot?.()}
            className="p-3 rounded-lg hover:bg-white/[0.06] transition-colors"
            title="Capture Receipt"
          >
            <Camera className="w-5 h-5 text-white/60" />
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="p-3 rounded-lg bg-[#1DB954] text-black hover:bg-[#1ed760] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 