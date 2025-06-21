//components/results/MarketSection.jsx
import React from 'react';

export default function MarketSection({ listingsLink }) {
  if (!listingsLink) return null;

  return (
    <div className="market-section">
      <h2 className="section-title">Find Listings</h2>
      <div className="listings-card">
        <p className="listings-label">Search across major listing sites with one click.</p>
        <a href={listingsLink} target="_blank" rel="noopener noreferrer" className="listings-link">
          Search on AutoTempest &rarr;
        </a>
      </div>
      <style jsx>{`
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-bottom: 2px solid var(--primary);
          padding-bottom: 0.5rem;
        }
        .listings-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }
        .listings-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .listings-link {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
          transition: transform 0.2s ease;
          display: inline-block;
        }
        .listings-link:hover {
          opacity: 0.9;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}