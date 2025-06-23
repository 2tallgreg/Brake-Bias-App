// components/results/SpecsCard.jsx
import React from 'react';

export default function SpecsCard({ label, value }) {
  // Check if the value is a simple string to apply specific styling
  const isStringValue = typeof value === 'string';

  return (
    <div className="specs-card">
      <p className="spec-label">{label}</p>
      <div className={`spec-value ${isStringValue ? 'is-string' : ''}`}>
        {value}
      </div>

      <style jsx>{`
        .specs-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .spec-label {
          font-size: 1rem;
          color: var(--text-secondary);
          margin: 0 0 0.75rem;
          font-weight: 600;
          text-align: center;
        }
        .spec-value {
          color: var(--text-primary);
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.6;
        }
        /* Style for single-line values like Drivetrain */
        .spec-value.is-string {
          font-size: 1.75rem;
          font-weight: 700;
        }
        /* Style for lists like Engine Options */
        .spec-value :global(ul) {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          text-align: left;
        }
        .spec-value :global(li) {
          font-size: 1.1rem;
          font-weight: 500;
        }
        .spec-value :global(li strong) {
          font-weight: 700;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
