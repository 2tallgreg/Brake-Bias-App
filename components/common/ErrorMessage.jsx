// components/common/ErrorMessage.jsx
'use client';

import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <h2 className="error-title">An Error Occurred</h2>
      <p className="error-details">{message || "We're sorry, but something went wrong. Please try again later."}</p>
      <a href="/" className="home-button">
        Go to Homepage
      </a>
      <style jsx>{`
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          margin: 2rem auto;
          max-width: 600px;
          border: 1px solid #dc3545;
          border-radius: 16px;
          background-color: rgba(220, 53, 69, 0.05);
        }
        .error-title {
          font-size: 1.75rem;
          color: #dc3545;
          margin: 0 0 0.5rem;
        }
        .error-details {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .home-button {
          padding: 0.5rem 1rem;
          background-color: #dc3545;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}