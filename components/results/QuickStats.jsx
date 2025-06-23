// components/results/QuickStats.jsx
import React from 'react';
import SpecsCard from './SpecsCard';

export default function QuickStats({ engine_options, drivetrain, transmission_options }) {
  // Check if the data is valid and not the "Data Not Available" sentinel.
  const hasValidEngines = Array.isArray(engine_options) && engine_options.length > 0 && engine_options[0].name !== "Data Not Available";
  const hasValidTransmissions = Array.isArray(transmission_options) && transmission_options.length > 0 && transmission_options[0] !== "Data Not Available";
  const hasValidDrivetrain = drivetrain && drivetrain !== "Data Not Available";

  // We now render all cards, but show a fallback message if data is invalid.
  return (
    <div className="quick-stats-container">
      <h2 className="section-title">Quick Stats</h2>
      <div className="stats-grid">
        <SpecsCard 
          label="Available Engines" 
          value={
            hasValidEngines ? (
              <ul>
                {engine_options.map((engine, i) => (
                  <li key={i}>
                    <strong>{engine.name}:</strong> {engine.specs}
                  </li>
                ))}
              </ul>
            ) : "Data Not Available"
          } 
        />
        <SpecsCard 
          label="Drivetrain" 
          value={hasValidDrivetrain ? drivetrain : "Data Not Available"}
        />
        <SpecsCard 
          label="Transmissions" 
          value={
            hasValidTransmissions ? (
              <ul>
                {transmission_options.map((trans, i) => <li key={i}>{trans}</li>)}
              </ul>
            ) : "Data Not Available"
          }
        />
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
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          align-items: stretch; /* Makes cards in the same row equal height */
        }
      `}</style>
    </div>
  );
}
