// components/results/PricingSection.jsx
import React from 'react';

export default function PricingSection({ pricing }) {
  if (!pricing || !pricing.msrp) return null;

  return (
    <div className="pricing-section">
       <h2 className="section-title">Pricing</h2>
       <div className="price-display">
         <span className="price-label">MSRP</span>
         <span className="price-value">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(pricing.msrp)}</span>
       </div>
        <style jsx>{`
          .pricing-section {
            margin-bottom: 2rem;
          }
          .section-title {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text-primary);
          }
          .price-display {
            background-color: var(--bg-secondary);
            border-radius: 12px;
            border: 1px solid var(--border);
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .price-label {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-secondary);
          }
          .price-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--color-accent);
          }
        `}</style>
    </div>
  );
}