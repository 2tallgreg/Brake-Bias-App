// components/results/QuickStats.jsx
import React from 'react';
import SpecsCard from './SpecsCard';

// Updated to receive specific props instead of a single 'stats' object
export default function QuickStats({ engine, drivetrain, transmission }) {
  const quickStats = [
    { label: 'Engine', value: engine },
    { label: 'Drivetrain', value: drivetrain },
    { label: 'Transmission', value: transmission },
  ];

  // A check to make sure we don't render an empty section
  const hasStats = quickStats.some(stat => stat.value && stat.value !== "Data Not Available");
  if (!hasStats) return null;

  return (
    <div className="quick-stats-container">
      <h2 className="section-title">Quick Stats</h2>
      <div className="stats-grid">
        {quickStats.map((stat, index) => (
          (stat.value && stat.value !== "Data Not Available") ? <SpecsCard key={index} label={stat.label} value={stat.value} /> : null
        ))}
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
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}