// components/results/MarketSection.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/helpers';

export default function MarketSection({ vehicleInfo, pricing }) {
  const [searchRadius, setSearchRadius] = useState('50');
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSetup, setAlertSetup] = useState(false);

  const buildAutoTempestUrl = (customParams = {}) => {
    const params = new URLSearchParams({
      make: vehicleInfo.make,
      model: vehicleInfo.model,
      year_from: vehicleInfo.year,
      year_to: vehicleInfo.year,
      ...customParams
    });

    if (vehicleInfo.submodel) {
      params.append('trim', vehicleInfo.submodel);
    }

    if (vehicleInfo.zipcode) {
      params.append('zip', vehicleInfo.zipcode);
      params.append('radius', searchRadius);
    }

    return `https://www.autotempest.com/results?${params.toString()}`;
  };

  const handleAlertSetup = (e) => {
    e.preventDefault();
    if (alertEmail) {
      // In production, this would call an API to set up the alert
      setAlertSetup(true);
      setTimeout(() => setAlertSetup(false), 5000);
    }
  };

  const marketStats = [
    {
      icon: '📊',
      label: 'Market Availability',
      value: pricing?.localData?.listings 
        ? `${pricing.localData.listings} vehicles` 
        : 'Check AutoTempest',
      detail: vehicleInfo.zipcode ? `Within ${searchRadius} miles` : 'Nationwide'
    },
    {
      icon: '💰',
      label: 'Average Price',
      value: pricing?.localData?.averagePrice 
        ? formatCurrency(pricing.localData.averagePrice)
        : pricing?.usedMarket?.average 
        ? formatCurrency(pricing.usedMarket.average)
        : 'Varies',
      detail: 'Based on current listings'
    },
    {
      icon: '📅',
      label: 'Market Speed',
      value: pricing?.localData?.daysOnMarket 
        ? `${pricing.localData.daysOnMarket} days`
        : '30-45 days',
      detail: 'Average time to sell'
    }
  ];

  const buyingTips = [
    'Get a pre-purchase inspection from a trusted mechanic',
    'Check the vehicle history report (Carfax/AutoCheck)',
    'Test drive in various conditions (highway, city, parking)',
    'Compare prices across multiple dealers',
    'Consider certified pre-owned for warranty coverage',
    `Best time to buy: End of month/year for better deals`
  ];

  return (
    <div className="market-section">
      <h2>Find Your {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}</h2>

      {/* Market Overview */}
      <div className="info-card">
        <h3>Current Market Overview</h3>
        <div className="market-stats">
          {marketStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-detail">{stat.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search Options */}
      <div className="info-card search-options">
        <h3>Search Options</h3>
        
        {vehicleInfo.zipcode && (
          <div className="radius-selector">
            <label htmlFor="radius">Search Radius</label>
            <select 
              id="radius"
              value={searchRadius} 
              onChange={(e) => setSearchRadius(e.target.value)}
              className="form-select"
            >
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
              <option value="200">200 miles</option>
              <option value="500">500 miles</option>
              <option value="0">Nationwide</option>
            </select>
          </div>
        )}

        <div className="search-actions">
          <motion.a 
            href={buildAutoTempestUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="action-button primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="13" x2="15" y2="13"></line>
            </svg>
            Search Current Inventory
          </motion.a>

          <div className="alternative-searches">
            <h4>Alternative Searches</h4>
            <div className="alt-links">
              <a 
                href={buildAutoTempestUrl({ 
                  year_from: parseInt(vehicleInfo.year) - 1,
                  year_to: parseInt(vehicleInfo.year) - 1 
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="alt-link"
              >
                {parseInt(vehicleInfo.year) - 1} Models
              </a>
              <a 
                href={buildAutoTempestUrl({ 
                  year_from: parseInt(vehicleInfo.year) + 1,
                  year_to: parseInt(vehicleInfo.year) + 1 
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="alt-link"
              >
                {parseInt(vehicleInfo.year) + 1} Models
              </a>
              <a 
                href={buildAutoTempestUrl({ 
                  year_from: parseInt(vehicleInfo.year) - 2,
                  year_to: parseInt(vehicleInfo.year) + 2 
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="alt-link"
              >
                ±2 Year Range
              </a>
              <a 
                href={buildAutoTempestUrl({ 
                  year_from: '',
                  year_to: '' 
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="alt-link"
              >
                All Years
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Buying Guide */}
      <div className="info-card">
        <h3>Buying Guide & Tips</h3>
        <div className="tips-grid">
          <div className="tips-section">
            <h4>✅ Pre-Purchase Checklist</h4>
            <ul className="checklist">
              {buyingTips.map((tip, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="tips-section">
            <h4>🚩 Red Flags to Avoid</h4>
            <ul className="warning-list">
              <li>Unusually low prices (possible salvage/flood damage)</li>
              <li>Sellers refusing inspections</li>
              <li>Missing maintenance records</li>
              <li>Signs of accident damage (panel gaps, paint mismatch)</li>
              <li>Modified vehicles without documentation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Price Alerts */}
      <div className="info-card alert-card">
        <h3>Get Price Drop Alerts</h3>
        <p>Be the first to know when prices drop or new inventory arrives.</p>
        
        <form onSubmit={handleAlertSetup} className="alert-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={alertEmail}
              onChange={(e) => setAlertEmail(e.target.value)}
              className="email-input"
              required
            />
            <button type="submit" className="alert-button">
              Set Alert
            </button>
          </div>
        </form>

        {alertSetup && (
          <motion.div 
            className="alert-success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✅ Alert set up successfully! You'll receive updates at {alertEmail}
          </motion.div>
        )}
      </div>

      {/* Additional Resources */}
      <div className="info-card resources-card">
        <h3>Additional Resources</h3>
        <div className="resources-grid">
          <a 
            href={`https://www.kbb.com/${vehicleInfo.make.toLowerCase()}/${vehicleInfo.model.toLowerCase()}/${vehicleInfo.year}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            <span className="resource-icon">📘</span>
            <span className="resource-text">
              <strong>Kelley Blue Book</strong>
              <small>Pricing & Values</small>
            </span>
          </a>
          
          <a 
            href={`https://www.carfax.com/`}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            <span className="resource-icon">📋</span>
            <span className="resource-text">
              <strong>Carfax</strong>
              <small>Vehicle History</small>
            </span>
          </a>
          
          <a 
            href={`https://www.nhtsa.gov/vehicle/${vehicleInfo.year}/${vehicleInfo.make}/${vehicleInfo.model}`}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            <span className="resource-icon">🛡️</span>
            <span className="resource-text">
              <strong>NHTSA</strong>
              <small>Safety Ratings</small>
            </span>
          </a>
          
          <a 
            href={`https://repairpal.com/cars/${vehicleInfo.make.toLowerCase()}/${vehicleInfo.model.toLowerCase()}/${vehicleInfo.year}`}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link"
          >
            <span className="resource-icon">🔧</span>
            <span className="resource-text">
              <strong>RepairPal</strong>
              <small>Maintenance Costs</small>
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .market-section {
          margin-bottom: 2rem;
        }

        h2 {
          margin-bottom: 1.5rem;
        }

        h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        h4 {
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
        }

        .info-card {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .market-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .stat-item {
          display: flex;
          gap: 1rem;
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.25rem 0;
        }

        .stat-detail {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .search-options {
          background: var(--bg-secondary);
        }

        .radius-selector {
          margin-bottom: 1.5rem;
        }

        .radius-selector label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .form-select {
          width: 200px;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
          cursor: pointer;
        }

        .search-actions {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .action-button.primary {
          background: var(--primary);
          color: white;
          font-size: 1.125rem;
        }

        .action-button.primary:hover {
          background: #0051D5;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .alternative-searches {
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
        }

        .alt-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .alt-link {
          padding: 0.5rem 1rem;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-primary);
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .alt-link:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .checklist, .warning-list {
          list-style: none;
          padding: 0;
        }

        .checklist li, .warning-list li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .checklist li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        .warning-list li::before {
          content: '⚠';
          position: absolute;
          left: 0;
          color: var(--danger);
        }

        .alert-card {
          background: var(--bg-secondary);
          border: 2px solid var(--primary);
        }

        .alert-card p {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .alert-form {
          margin-bottom: 1rem;
        }

        .form-group {
          display: flex;
          gap: 0.75rem;
        }

        .email-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
        }

        .alert-button {
          padding: 0.75rem 1.5rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .alert-button:hover {
          background: #0051D5;
        }

        .alert-success {
          padding: 1rem;
          background: var(--success);
          color: white;
          border-radius: 8px;
          text-align: center;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .resource-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .resource-link:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px var(--shadow);
        }

        .resource-icon {
          font-size: 2rem;
        }

        .resource-text {
          display: flex;
          flex-direction: column;
        }

        .resource-text strong {
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .resource-text small {
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .market-stats {
            grid-template-columns: 1fr;
          }

          .tips-grid {
            grid-template-columns: 1fr;
          }

          .form-group {
            flex-direction: column;
          }

          .resources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}