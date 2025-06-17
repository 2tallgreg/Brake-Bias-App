// components/results/QuickStats.jsx
'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/helpers';

export default function QuickStats({ vehicleData }) {
  const stats = [
    {
      icon: '⭐',
      label: 'Avg Rating',
      value: vehicleData.professionalSummary?.averageRating 
        ? `${vehicleData.professionalSummary.averageRating.toFixed(1)}/5`
        : 'N/A',
      color: 'warning'
    },
    {
      icon: '💰',
      label: 'Market Price',
      value: vehicleData.pricing?.usedMarket?.average 
        ? formatCurrency(vehicleData.pricing.usedMarket.average)
        : vehicleData.pricing?.msrp?.average 
        ? formatCurrency(vehicleData.pricing.msrp.average)
        : 'N/A',
      color: 'success'
    },
    {
      icon: '⛽',
      label: 'Fuel Economy',
      value: vehicleData.specs?.mpg 
        ? `${vehicleData.specs.mpg.city}/${vehicleData.specs.mpg.highway} MPG`
        : 'N/A',
      color: 'primary'
    },
    {
      icon: '💬',
      label: 'Owner Sentiment',
      value: vehicleData.reddit?.sentimentScore 
        ? `${Math.round(vehicleData.reddit.sentimentScore * 100)}% Positive`
        : 'N/A',
      color: vehicleData.reddit?.sentimentScore > 0.7 ? 'success' : 'warning'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="quick-stats"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className={`stat-card ${stat.color}`}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </motion.div>
      ))}

      <style jsx>{`
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          box-shadow: 0 4px 12px var(--shadow);
        }

        .stat-icon {
          font-size: 2.5rem;
          line-height: 1;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .stat-card.primary {
          border-color: var(--primary);
        }

        .stat-card.success {
          border-color: var(--success);
        }

        .stat-card.warning {
          border-color: var(--warning);
        }

        .stat-card.danger {
          border-color: var(--danger);
        }

        @media (max-width: 768px) {
          .quick-stats {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            padding: 1rem;
          }

          .stat-icon {
            font-size: 2rem;
          }

          .stat-value {
            font-size: 1rem;
          }

          .stat-label {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </motion.div>
  );
}