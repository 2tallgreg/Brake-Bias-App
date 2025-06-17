// components/results/PricingSection.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/helpers';

export default function PricingSection({ pricing, vehicleInfo }) {
  const [priceView, setPriceView] = useState('overview');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  
  // Loan calculator state
  const [loanTerms, setLoanTerms] = useState({
    downPayment: 5000,
    loanTerm: 60, // months
    interestRate: 4.5
  });

  useEffect(() => {
    if (pricing?.msrp?.average) {
      calculateMonthlyPayment();
    }
  }, [loanTerms, pricing]);

  const calculateMonthlyPayment = () => {
    if (!pricing?.msrp?.average) return;
    
    const principal = pricing.msrp.average - loanTerms.downPayment;
    const monthlyRate = loanTerms.interestRate / 100 / 12;
    const numPayments = loanTerms.loanTerm;
    
    const payment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    setMonthlyPayment(Math.round(payment));
  };

  if (!pricing) {
    return (
      <div className="info-card">
        <h3>Pricing Information</h3>
        <p>Pricing data not available for this vehicle.</p>
      </div>
    );
  }

  const priceRange = {
    min: Math.min(pricing.msrp?.min || 0, pricing.usedMarket?.min || Infinity),
    max: Math.max(pricing.msrp?.max || 0, pricing.usedMarket?.max || 0)
  };

  const PriceRangeVisualizer = () => {
    const msrpPosition = ((pricing.msrp?.average || 0) - priceRange.min) / (priceRange.max - priceRange.min) * 100;
    const usedPosition = ((pricing.usedMarket?.average || 0) - priceRange.min) / (priceRange.max - priceRange.min) * 100;

    return (
      <div className="price-range-visualizer">
        <div className="price-line">
          {pricing.msrp?.average && (
            <motion.div 
              className="price-marker msrp"
              style={{ left: `${msrpPosition}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="marker-label">MSRP</span>
              <span className="marker-value">{formatCurrency(pricing.msrp.average)}</span>
            </motion.div>
          )}
          {pricing.usedMarket?.average && (
            <motion.div 
              className="price-marker used"
              style={{ left: `${usedPosition}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="marker-label">Used</span>
              <span className="marker-value">{formatCurrency(pricing.usedMarket.average)}</span>
            </motion.div>
          )}
        </div>
        <div className="price-scale">
          <span>{formatCurrency(priceRange.min)}</span>
          <span>{formatCurrency(priceRange.max)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="pricing-section">
      <h2>Pricing & Market Analysis</h2>

      <div className="price-tabs">
        <button 
          className={`tab ${priceView === 'overview' ? 'active' : ''}`}
          onClick={() => setPriceView('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${priceView === 'local' ? 'active' : ''}`}
          onClick={() => setPriceView('local')}
        >
          Local Market
        </button>
        <button 
          className={`tab ${priceView === 'calculator' ? 'active' : ''}`}
          onClick={() => setPriceView('calculator')}
        >
          Payment Calculator
        </button>
        <button 
          className={`tab ${priceView === 'depreciation' ? 'active' : ''}`}
          onClick={() => setPriceView('depreciation')}
        >
          Depreciation
        </button>
      </div>

      <motion.div
        key={priceView}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {priceView === 'overview' && (
          <div className="price-overview">
            <div className="info-card">
              <h3>Price Range Overview</h3>
              <PriceRangeVisualizer />
            </div>

            <div className="price-cards">
              {pricing.msrp && (
                <motion.div 
                  className="price-card new"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="price-header">
                    <h4>New (MSRP)</h4>
                    <span className="price-badge">Factory New</span>
                  </div>
                  <div className="price-range">
                    <div className="price-min">
                      <span className="label">Starting</span>
                      <span className="value">{formatCurrency(pricing.msrp.min)}</span>
                    </div>
                    <div className="price-divider">—</div>
                    <div className="price-max">
                      <span className="label">Fully Loaded</span>
                      <span className="value">{formatCurrency(pricing.msrp.max)}</span>
                    </div>
                  </div>
                  <div className="price-average">
                    <span className="label">Average Price</span>
                    <span className="value">{formatCurrency(pricing.msrp.average)}</span>
                  </div>
                </motion.div>
              )}

              {pricing.usedMarket && (
                <motion.div 
                  className="price-card used"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="price-header">
                    <h4>Used Market</h4>
                    <span className="price-badge">Pre-Owned</span>
                  </div>
                  <div className="price-range">
                    <div className="price-min">
                      <span className="label">Low</span>
                      <span className="value">{formatCurrency(pricing.usedMarket.min)}</span>
                    </div>
                    <div className="price-divider">—</div>
                    <div className="price-max">
                      <span className="label">High</span>
                      <span className="value">{formatCurrency(pricing.usedMarket.max)}</span>
                    </div>
                  </div>
                  <div className="price-average">
                    <span className="label">Average Price</span>
                    <span className="value">{formatCurrency(pricing.usedMarket.average)}</span>
                  </div>
                  {pricing.msrp && (
                    <div className="savings">
                      Save {formatCurrency(pricing.msrp.average - pricing.usedMarket.average)} vs New
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="info-card">
              <h3>Price Insights</h3>
              <div className="insights-grid">
                <div className="insight">
                  <span className="insight-icon">💡</span>
                  <span className="insight-text">
                    {pricing.usedMarket && pricing.msrp 
                      ? `Used models are typically ${Math.round((1 - pricing.usedMarket.average / pricing.msrp.average) * 100)}% less than new`
                      : 'Compare new and used prices to find the best value'}
                  </span>
                </div>
                <div className="insight">
                  <span className="insight-icon">📊</span>
                  <span className="insight-text">
                    Prices vary by trim level, options, and condition
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {priceView === 'local' && (
          <div className="local-market">
            <div className="info-card">
              <h3>Local Market Analysis</h3>
              {pricing.localData && vehicleInfo.zipcode ? (
                <div className="local-stats">
                  <div className="stat-card">
                    <div className="stat-icon">📍</div>
                    <div className="stat-content">
                      <div className="stat-value">{pricing.localData.listings}</div>
                      <div className="stat-label">Available Listings</div>
                      <div className="stat-detail">Within {pricing.localData.radius} of {vehicleInfo.zipcode}</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                      <div className="stat-value">{formatCurrency(pricing.localData.averagePrice)}</div>
                      <div className="stat-label">Local Average Price</div>
                      <div className="stat-detail trend">{pricing.localData.marketTrend} market</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                      <div className="stat-value">{pricing.localData.daysOnMarket} days</div>
                      <div className="stat-label">Average Days on Market</div>
                      <div className="stat-detail">
                        {pricing.localData.daysOnMarket < 30 ? 'Fast-moving' : 'Normal pace'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-local-data">
                  <p>Enter your ZIP code to see local market data</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      const zip = prompt('Enter your ZIP code:');
                      if (zip) {
                        window.location.href = `${window.location.pathname}?${new URLSearchParams({
                          ...Object.fromEntries(new URLSearchParams(window.location.search)),
                          zipcode: zip
                        })}`;
                      }
                    }}
                  >
                    Add ZIP Code
                  </button>
                </div>
              )}
            </div>

            {pricing.localData && (
              <div className="info-card">
                <h3>Market Recommendations</h3>
                <ul className="recommendations">
                  <li>
                    {pricing.localData.daysOnMarket < 20 
                      ? '🔥 Hot market - Act quickly on good deals'
                      : '✅ Normal market - Take time to compare options'}
                  </li>
                  <li>
                    {pricing.localData.listings > 10
                      ? '📈 Good inventory - More negotiating power'
                      : '📉 Limited inventory - Less room for negotiation'}
                  </li>
                  <li>
                    💡 Consider expanding your search radius for more options
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {priceView === 'calculator' && (
          <div className="payment-calculator">
            <div className="info-card">
              <h3>Monthly Payment Calculator</h3>
              <div className="calculator-grid">
                <div className="input-group">
                  <label>Vehicle Price</label>
                  <input
                    type="text"
                    value={formatCurrency(pricing.msrp?.average || 0)}
                    disabled
                    className="price-input"
                  />
                </div>
                
                <div className="input-group">
                  <label>Down Payment</label>
                  <input
                    type="number"
                    value={loanTerms.downPayment}
                    onChange={(e) => setLoanTerms({...loanTerms, downPayment: parseInt(e.target.value) || 0})}
                    className="form-input"
                  />
                </div>
                
                <div className="input-group">
                  <label>Loan Term (months)</label>
                  <select
                    value={loanTerms.loanTerm}
                    onChange={(e) => setLoanTerms({...loanTerms, loanTerm: parseInt(e.target.value)})}
                    className="form-input"
                  >
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                    <option value="72">72 months</option>
                    <option value="84">84 months</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label>Interest Rate (%)</label>
                  <input
                    type="number"
                    value={loanTerms.interestRate}
                    onChange={(e) => setLoanTerms({...loanTerms, interestRate: parseFloat(e.target.value) || 0})}
                    step="0.1"
                    className="form-input"
                  />
                </div>
              </div>
              
              {monthlyPayment && (
                <motion.div 
                  className="payment-result"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="monthly-payment">
                    <span className="label">Estimated Monthly Payment</span>
                    <span className="amount">{formatCurrency(monthlyPayment)}</span>
                  </div>
                  <div className="loan-details">
                    <div className="detail">
                      <span className="label">Total Interest</span>
                      <span className="value">
                        {formatCurrency(monthlyPayment * loanTerms.loanTerm - (pricing.msrp.average - loanTerms.downPayment))}
                      </span>
                    </div>
                    <div className="detail">
                      <span className="label">Total Amount</span>
                      <span className="value">
                        {formatCurrency(monthlyPayment * loanTerms.loanTerm + loanTerms.downPayment)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {priceView === 'depreciation' && (
          <div className="depreciation-analysis">
            <div className="info-card">
              <h3>Expected Depreciation</h3>
              {pricing.depreciation ? (
                <div className="depreciation-chart">
                  <div className="chart-header">
                    <p>Based on historical data for similar vehicles</p>
                  </div>
                  <div className="depreciation-bars">
                    {Object.entries(pricing.depreciation).map(([period, percentage]) => (
                      <motion.div 
                        key={period}
                        className="depreciation-item"
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage.replace('%', '')}%` }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <div className="bar-container">
                          <div className="bar" />
                          <span className="percentage">{percentage}</span>
                        </div>
                        <span className="period">{period.replace('year', 'Year ')}</span>
                      </motion.div>
                    ))}
                  </div>
                  {pricing.msrp?.average && (
                    <div className="depreciation-values">
                      <h4>Estimated Values</h4>
                      <div className="value-grid">
                        <div className="value-item">
                          <span className="label">New</span>
                          <span className="value">{formatCurrency(pricing.msrp.average)}</span>
                        </div>
                        <div className="value-item">
                          <span className="label">After 1 Year</span>
                          <span className="value">
                            {formatCurrency(pricing.msrp.average * 0.82)}
                          </span>
                        </div>
                        <div className="value-item">
                          <span className="label">After 3 Years</span>
                          <span className="value">
                            {formatCurrency(pricing.msrp.average * 0.65)}
                          </span>
                        </div>
                        <div className="value-item">
                          <span className="label">After 5 Years</span>
                          <span className="value">
                            {formatCurrency(pricing.msrp.average * 0.55)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p>Depreciation data not available</p>
              )}
            </div>
            
            <div className="info-card">
              <h3>Depreciation Tips</h3>
              <ul className="tips-list">
                <li>🚗 First-year depreciation is typically the highest</li>
                <li>📈 Well-maintained vehicles depreciate slower</li>
                <li>🎨 Popular colors tend to hold value better</li>
                <li>📅 Lower mileage vehicles retain more value</li>
                <li>🔧 Complete service records help maintain resale value</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>

      <style jsx>{`
        .pricing-section {
          margin-bottom: 2rem;
        }

        h2 {
          margin-bottom: 1.5rem;
        }

        h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .info-card {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .price-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          overflow-x: auto;
        }

        .tab {
          padding: 0.75rem 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          color: var(--text-secondary);
        }

        .tab:hover {
          background: var(--bg-primary);
        }

        .tab.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .price-range-visualizer {
          margin: 2rem 0;
          padding: 2rem 0;
        }

        .price-line {
          position: relative;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          margin: 3rem 0;
        }

        .price-marker {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .price-marker::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: var(--primary);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 2px 4px var(--shadow);
        }

        .price-marker.used::before {
          background: var(--success);
        }

        .marker-label {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.875rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .marker-value {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
          white-space: nowrap;
        }

        .price-scale {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .price-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .price-card {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
          border: 2px solid var(--border);
        }

        .price-card.new {
          border-color: var(--primary);
        }

        .price-card.used {
          border-color: var(--success);
        }

        .price-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .price-header h4 {
          margin: 0;
        }

        .price-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: var(--bg-primary);
          border-radius: 12px;
          color: var(--text-secondary);
        }

        .price-range {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .price-min, .price-max {
          flex: 1;
          text-align: center;
        }

        .price-divider {
          color: var(--text-tertiary);
          font-size: 1.5rem;
        }

        .label {
          display: block;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .value {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .price-average {
          text-align: center;
          padding: 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
        }

        .price-average .value {
          font-size: 1.5rem;
          color: var(--primary);
        }

        .savings {
          text-align: center;
          margin-top: 1rem;
          padding: 0.75rem;
          background: var(--success);
          color: white;
          border-radius: 8px;
          font-weight: 600;
        }

        .insights-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .insight {
          display: flex;
          align-items: start;
          gap: 1rem;
        }

        .insight-icon {
          font-size: 1.5rem;
        }

        .insight-text {
          flex: 1;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .local-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0.25rem 0;
        }

        .stat-detail {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .stat-detail.trend {
          color: var(--success);
          font-weight: 600;
        }

        .no-local-data {
          text-align: center;
          padding: 2rem;
        }

        .no-local-data p {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .recommendations {
          list-style: none;
          padding: 0;
        }

        .recommendations li {
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
        }

        .recommendations li:last-child {
          border-bottom: none;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-input, .price-input {
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
        }

        .price-input {
          font-weight: 600;
        }

        .payment-result {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--bg-primary);
          border-radius: 12px;
          text-align: center;
        }

        .monthly-payment {
          margin-bottom: 1.5rem;
        }

        .monthly-payment .label {
          font-size: 1rem;
        }

        .monthly-payment .amount {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-top: 0.5rem;
        }

        .loan-details {
          display: flex;
          justify-content: center;
          gap: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .detail .value {
          font-weight: 600;
        }

        .depreciation-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          height: 200px;
          margin: 2rem 0;
        }

        .depreciation-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .bar-container {
          position: relative;
          width: 60px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .bar {
          background: var(--danger);
          border-radius: 4px 4px 0 0;
          width: 100%;
          height: 100%;
        }

        .percentage {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 600;
          color: var(--danger);
        }

        .period {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .depreciation-values {
          margin-top: 2rem;
        }

        .depreciation-values h4 {
          margin-bottom: 1rem;
        }

        .value-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .value-item {
          text-align: center;
          padding: 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
        }

        .tips-list {
          list-style: none;
          padding: 0;
        }

        .tips-list li {
          padding: 0.75rem 0;
          color: var(--text-secondary);
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: #0051D5;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .price-tabs {
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
          }

          .price-cards {
            grid-template-columns: 1fr;
          }

          .loan-details {
            flex-direction: column;
            gap: 1rem;
          }

          .depreciation-bars {
            height: 150px;
          }

          .bar-container {
            width: 40px;
          }
        }
      `}</style>
    </div>
  );
}