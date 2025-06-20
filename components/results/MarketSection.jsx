import React from 'react';

export default function MarketSection({ listingsLink }) {
  if (!listingsLink) return null;

  return (
    <div className="market-section">
      <h2 className="section-title">Find Listings</h2>
      <a href={listingsLink} target="_blank" rel="noopener noreferrer" className="market-link">
        Search all major listings on AutoTempest &rarr;
      </a>
      <style jsx>{`
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-bottom: 2px solid var(--color-accent);
          padding-bottom: 0.5rem;
        }
        .market-link {
          display: block;
          padding: 1rem;
          background-color: var(--color-accent);
          color: white;
          text-align: center;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .market-link:hover {
          transform: translateY(-2px);
          opacity: 0.9;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}