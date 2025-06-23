// components/results/SpecsCard.jsx
import React from 'react';

export default function SpecsCard({ label, value }) {
  return (
    <div className="specs-card">
      <p className="spec-label">{label}</p>
      <div className="spec-value">{value}</div>

      <style jsx>{`
        .specs-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          height: 100%; /* Ensures cards in the same row are the same height */
        }
        .spec-label {
          font-size: 1rem;
          color: var(--text-secondary);
          margin: 0 0 0.75rem;
          font-weight: 600;
        }
        .spec-value {
          font-size: 1.25rem; /* Increased font size for better readability */
          color: var(--text-primary);
          font-weight: 700; /* Bolder font for all values */
          text-align: center;
          flex-grow: 1;
          display: flex;
          align-items: center; /* Vertically center content */
          justify-content: center;
          line-height: 1.5;
        }
        /* Styling for when the value is a list */
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
          font-size: 1.1rem; /* Consistent size for list items */
          font-weight: 500; /* Slightly less bold for list details */
        }
        .spec-value :global(li strong) {
          font-weight: 700; /* Emphasize the key part of a list item */
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
