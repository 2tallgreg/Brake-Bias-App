// components/results/MarketSection.jsx
import React from 'react';

export default function MarketSection({ market }) {
  if (!market || !market.depreciation) return null;

  return (
    <div className="market-section">
      <h2 className="section-title">Market Analysis</h2>
      <div className="market-card">
        <h3 className="market-subtitle">5-Year Depreciation</h3>
        <p className="market-value">{market.depreciation}%</p>
        <p className="market-description">
          This vehicle is projected to depreciate by {market.depreciation}% after five years.
          Lower percentages are generally better, indicating the car holds its value well.
        </p>
      </div>
      <style jsx>{`
        .market-section {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .market-card {
          background-color: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border);
          padding: 1.5rem;
        }
        .market-subtitle {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }
        .market-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-accent);
          margin: 0.5rem 0;
        }
        .market-description {
            font-size: 1rem;
            color: var(--text-secondary);
            margin: 0;
        }
      `}</style>
    </div>
  );
}