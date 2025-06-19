// components/common/ErrorMessage.jsx
import React from 'react';

export default function ErrorMessage({ message }) {
  const errorMessage = message instanceof Error ? message.message : message;
  
  return (
    <div className="error-container">
      <h2 className="error-title">An Error Occurred</h2>
      <p className="error-text">{errorMessage || 'Something went wrong.'}</p>

      <style jsx>{`
        .error-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          text-align: center;
          background: var(--bg-secondary);
          border: 1px solid var(--danger);
          border-radius: 16px;
        }
        .error-title {
          color: var(--danger);
          margin-bottom: 1rem;
        }
        .error-text {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}