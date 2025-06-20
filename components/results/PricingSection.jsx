import React from 'react';

export default function PricingSection({ pricing }) {
  if (!pricing) return null;

  return (
    <div className="pricing-section">
       <h2 className="section-title">Pricing</h2>
       <div className="price-cards">
         <div className="price-card">
           <span className="price-label">Original MSRP</span>
           <span className="price-value">{pricing.msrp}</span>
         </div>
         <div className="price-card">
           <span className="price-label">Used Market Avg.</span>
           <span className="price-value">{pricing.usedAvg}</span>
         </div>
       </div>
        <style jsx>{`
          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text-primary);
            border-bottom: 2px solid var(--color-accent);
            padding-bottom: 0.5rem;
          }
          .price-cards {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .price-card {
            background-color: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1rem;
            text-align: center;
          }
          .price-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            font-weight: 600;
          }
          .price-value {
            display: block;
            font-size: 1.75rem;
            font-weight: 800;
            color: var(--text-primary);
            margin-top: 0.25rem;
          }
        `}</style>
    </div>
  );
}