import React from 'react';
import SpecsCard from './SpecsCard';

export default function QuickStats({ stats }) {
  if (!stats) return null;

  const quickStats = [
    { label: 'Engine', value: stats.engine },
    { label: 'Drivetrain', value: stats.drivetrain },
    { label: 'Transmission', value: stats.transmission },
  ];

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
          border-bottom: 2px solid var(--color-accent);
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