// components/results/PricingSection.jsx
import React from 'react';

export default function PricingSection({ msrp, usedAvg }) {
  return (
    <div className="pricing-section">
      <h2 className="section-title">Pricing</h2>
      <div className="pricing-grid">
        <div className="price-card">
          <p className="price-label">Original MSRP</p>
          <p className="price-value">{msrp || 'N/A'}</p>
        </div>
        <div className="price-card">
          <p className="price-label">Used Market Average</p>
          <p className="price-value">{usedAvg || 'N/A'}</p>
        </div>
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
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .price-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }
        .price-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .price-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}