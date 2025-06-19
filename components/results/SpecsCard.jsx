// components/results/SpecsCard.jsx
import React from 'react';

export default function SpecsCard({ label, value }) {
  return (
    <div className="specs-card">
      <p className="spec-label">{label}</p>
      <p className="spec-value">{value}</p>

      <style jsx>{`
        .specs-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        .spec-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0 0 0.25rem;
          font-weight: 600;
        }
        .spec-value {
          font-size: 1.25rem;
          color: var(--text-primary);
          font-weight: 700;
          margin: 0;
        }
      `}</style>
    </div>
  );
}