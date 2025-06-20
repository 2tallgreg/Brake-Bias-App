// components/results/VehicleHeader.jsx
import React from 'react';

// Changed props to accept a single 'yearMakeModel' string
export default function VehicleHeader({ yearMakeModel, tldr }) {
  return (
    <div className="vehicle-header">
      {/* Display the single prop directly */}
      <h1 className="vehicle-title">{yearMakeModel || 'Vehicle Details'}</h1>
      {tldr && <p className="vehicle-tldr">{tldr}</p>}

      <style jsx>{`
        .vehicle-header {
          padding: 2rem;
          background-color: var(--bg-secondary);
          border-radius: 16px;
          border: 1px solid var(--border);
          text-align: center;
          margin-bottom: 2rem;
        }
        .vehicle-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .vehicle-tldr {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 80ch;
          margin: 0 auto;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}