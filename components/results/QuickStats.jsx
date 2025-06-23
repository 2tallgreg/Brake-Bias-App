// components/results/QuickStats.jsx
import React from 'react';
import SpecsCard from './SpecsCard';

export default function QuickStats({ engine_options, drivetrain, transmission_options }) {

  // A more robust helper function to render engine options
  const renderEngineValue = () => {
    // If the data is not a valid array, show fallback
    if (!Array.isArray(engine_options) || engine_options.length === 0) {
      return "Data Not Available";
    }
    // Check for the "Data Not Available" sentinel value in various forms
    if ((typeof engine_options[0] === 'object' && engine_options[0]?.name === "Data Not Available") || engine_options[0] === "Data Not Available") {
        return "Data Not Available";
    }

    // If data is valid, render it as a list
    return (
      <ul>
        {engine_options.map((engine, i) => {
          // This handles if the AI returns an object {name, specs} or just a string
          if (typeof engine === 'object' && engine !== null && engine.name) {
            return (
              <li key={i}>
                <strong>{engine.name}:</strong> {engine.specs}
              </li>
            );
          }
          if (typeof engine === 'string') {
              return <li key={i}>{engine}</li>
          }
          return null; // Ignore any malformed items in the array
        })}
      </ul>
    );
  };

  // A more robust helper for transmission options
  const renderTransmissionValue = () => {
    if (!Array.isArray(transmission_options) || transmission_options.length === 0 || transmission_options[0] === "Data Not Available") {
      return "Data Not Available";
    }
    
    return (
      <ul>
        {transmission_options.map((trans, i) => <li key={i}>{trans}</li>)}
      </ul>
    );
  };

  return (
    <div className="quick-stats-container">
      <h2 className="section-title">Quick Stats</h2>
      <div className="stats-grid">
        <SpecsCard 
          label="Available Engines" 
          value={renderEngineValue()}
        />
        <SpecsCard 
          label="Drivetrain" 
          value={drivetrain || "Data Not Available"}
        />
        <SpecsCard 
          label="Transmissions" 
          value={renderTransmissionValue()}
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
          align-items: stretch;
        }
      `}</style>
    </div>
  );
}
