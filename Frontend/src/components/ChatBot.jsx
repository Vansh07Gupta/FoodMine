import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import classes from './ChatBot.module.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  const handleSubmit = async () => {
    if (!mood.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/bot/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      const data = await res.json();
      setResponse(data.recommendation || 'Sorry, no recommendation available.');
    } catch (error) {
      setResponse(error.message || 'Failed to get recommendation.');
    }
    setLoading(false);
    setMood(''); 
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) {
    return (
      <button
        className={classes.openIcon}
        onClick={() => setIsOpen(true)}
        aria-label="Open Chat"
      >
        💬
      </button>
    );
  }
  
  return (
    <div className={classes.chatBot}>
      <div className={classes.chatHeader}>
        🍽️ What’s on your mind?
        <button
          className={classes.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      <div className={classes.chatMessages}>
        {response ? (
          <ReactMarkdown>{response}</ReactMarkdown>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>
            Tell me your mood and I’ll recommend a dish!
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={classes.chatInput}>
        <input
          type="text"
          placeholder="How are you feeling?"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSubmit}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
