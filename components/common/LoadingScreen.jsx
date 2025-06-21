// components/common/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { funFacts } from '@/lib/constants';

export default function LoadingScreen() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    // Function to set a new random fact
    const updateFact = () => {
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      setFact(funFacts[randomIndex]);
    };

    // Set the initial fact immediately
    updateFact();

    // Set up an interval to change the fact every 5 seconds
    const intervalId = setInterval(updateFact, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Analyzing Data...</p>
      {fact && (
        <div className="fun-fact-container">
          <p className="fun-fact-title">Did you know?</p>
          <p className="fun-fact-text">{fact}</p>
        </div>
      )}

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 1rem;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid var(--border);
          border-top: 5px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.5rem;
        }
        .loading-text {
          font-weight: 500;
          color: var(--text-secondary);
          font-size: 1.25rem;
        }
        .fun-fact-container {
          margin-top: 2rem;
          padding: 1rem;
          max-width: 500px;
          text-align: center;
          border-top: 1px solid var(--border);
        }
        .fun-fact-title {
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .fun-fact-text {
          font-style: italic;
          color: var(--text-tertiary);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}