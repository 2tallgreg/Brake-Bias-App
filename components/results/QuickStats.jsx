// components/results/QuickStats.jsx
import React from 'react';
import SpecsCard from './SpecsCard';

export default function QuickStats({ engine_options, engine, drivetrain, transmission_options, transmission }) {
  // Debug logging
  console.log('QuickStats props:', { engine_options, engine, drivetrain, transmission_options, transmission });
  
  // Support both old and new data formats
  let engines = engine_options;
  let transmissions = transmission_options;
  
  // If we only have the old format, convert it
  if (!engines && engine) {
    // Parse engine string to extract details
    const engineStr = String(engine);
    engines = [{ name: "Engine", specs: engineStr }];
  }
  
  if (!transmissions && transmission) {
    // Convert single transmission to array
    transmissions = [String(transmission)];
  }
  
  // Default to empty arrays if still nothing
  if (!engines) engines = [];
  if (!transmissions) transmissions = [];
  
  // Check if the data is valid
  const hasValidEngines = engines && engines.length > 0 && 
    engines[0].specs !== "Data Not Available" && 
    engines[0].name !== "Data Not Available";
    
  const hasValidTransmissions = transmissions && transmissions.length > 0 && 
    transmissions[0] !== "Data Not Available";
    
  const hasValidDrivetrain = drivetrain && drivetrain !== "Data Not Available";

  // Debug logging
  console.log('Processed data:', { engines, transmissions, drivetrain });
  console.log('Validation:', { hasValidEngines, hasValidTransmissions, hasValidDrivetrain });

  // Always render all three cards
  return (
    <div className="quick-stats-container">
      <h2 className="section-title">Quick Stats</h2>
      <div className="stats-grid">
        <SpecsCard 
          label="Engine Specs" 
          value={
            hasValidEngines ? (
              <div className="engine-specs">
                {engines.map((engine, i) => (
                  <div key={i}>
                    {engine.name && engine.name !== "Engine" ? (
                      <>
                        <div className="engine-name">{engine.name}</div>
                        <div className="engine-details">{engine.specs}</div>
                      </>
                    ) : (
                      <div className="engine-details">{engine.specs || engine}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              engine || "Data Not Available"
            )
          } 
        />
        <SpecsCard 
          label="Drivetrain" 
          value={hasValidDrivetrain ? drivetrain : "Data Not Available"}
        />
        <SpecsCard 
          label="Transmission" 
          value={
            hasValidTransmissions ? (
              <div className="transmission-list">
                {transmissions.map((trans, i) => (
                  <div key={i}>{trans}</div>
                ))}
              </div>
            ) : (
              transmission || "Data Not Available"
            )
          }
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
        .engine-specs {
          text-align: left;
          width: 100%;
        }
        .engine-name {
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .engine-details {
          line-height: 1.4;
          font-weight: 500;
        }
        .transmission-list {
          text-align: center;
          width: 100%;
        }
        .transmission-list > div {
          margin-bottom: 0.5rem;
        }
        .transmission-list > div:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}