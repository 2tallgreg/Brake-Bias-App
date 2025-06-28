// components/results/QuickStats.jsx
import React from 'react';
import SpecsCard from './SpecsCard';

// This component is now simpler and accepts direct string props from the AI.
export default function QuickStats({ engine, drivetrain, transmission }) {
  
  return (
    <div className="quick-stats-container">
      <h2 className="section-title">Quick Stats</h2>
      <div className="stats-grid">
        <SpecsCard 
          label="Engine Specs" 
          value={engine || "Data Not Available"}
        />
        <SpecsCard 
          label="Drivetrain" 
          value={drivetrain || "Data Not Available"}
        />
        <SpecsCard 
          label="Transmission" 
          value={transmission || "Data Not Available"}
        />
      </div>
      <style jsx>{`
        .quick-stats-container {
          width: 100%;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-bottom: 2px solid var(--primary);
          padding-bottom: 0.5rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          align-items: stretch;
        }
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}