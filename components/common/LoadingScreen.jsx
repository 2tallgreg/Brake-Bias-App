// components/common/LoadingScreen.jsx
import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Analyzing Data...</p>

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
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
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}