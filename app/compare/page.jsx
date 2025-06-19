// app/compare/page.jsx
import React from 'react';

export default function ComparePage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Compare Vehicles</h1>
      <p className="page-subtitle">This feature is coming soon! You'll be able to compare two vehicles side-by-side to see how they stack up.</p>
      
      <style jsx>{`
        .page-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          text-align: center;
          background: var(--bg-secondary);
          border-radius: 16px;
          border: 1px solid var(--border);
        }
        .page-title {
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .page-subtitle {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}