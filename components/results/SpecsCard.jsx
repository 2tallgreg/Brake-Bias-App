// components/results/SpecsCard.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SpecsCard({ specs, variant = 'compact' }) {
  const [activeTab, setActiveTab] = useState('engine');

  if (!specs) {
    return (
      <div className="info-card">
        <h3>Vehicle Specifications</h3>
        <p>Specifications not available for this vehicle.</p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="info-card">
        <h3>Key Specifications</h3>
        <div className="specs-grid compact">
          {specs.engineOptions && specs.engineOptions.length > 0 && (
            <div className="spec-item">
              <span className="spec-icon">🔧</span>
              <span className="spec-label">Engine</span>
              <span className="spec-value">
                {specs.engineOptions[0].name} ({specs.engineOptions[0].horsepower} HP)
              </span>
            </div>
          )}
          {specs.transmission && (
            <div className="spec-item">
              <span className="spec-icon">⚙️</span>
              <span className="spec-label">Transmission</span>
              <span className="spec-value">{specs.transmission}</span>
            </div>
          )}
          {specs.drivetrain && (
            <div className="spec-item">
              <span className="spec-icon">🚗</span>
              <span className="spec-label">Drivetrain</span>
              <span className="spec-value">{specs.drivetrain}</span>
            </div>
          )}
          {specs.mpg && (
            <div className="spec-item">
              <span className="spec-icon">⛽</span>
              <span className="spec-label">Fuel Economy</span>
              <span className="spec-value">{specs.mpg.city}/{specs.mpg.highway} MPG</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Detailed view with tabs
  const specTabs = [
    { id: 'engine', label: 'Engine & Performance', icon: '🔧' },
    { id: 'dimensions', label: 'Dimensions', icon: '📏' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'colors', label: 'Colors', icon: '🎨' }
  ];

  return (
    <div className="specs-detailed">
      <h2>Complete Specifications</h2>
      
      <div className="spec-tabs">
        {specTabs.map(tab => (
          <button
            key={tab.id}
            className={`spec-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="spec-content"
      >
        {activeTab === 'engine' && (
          <div className="engine-specs">
            <div className="info-card">
              <h3>Engine Options</h3>
              <div className="engine-list">
                {specs.engineOptions?.map((engine, index) => (
                  <div key={index} className="engine-option">
                    <h4>{engine.name}</h4>
                    <div className="engine-stats">
                      <div className="stat">
                        <span className="stat-label">Horsepower</span>
                        <span className="stat-value">{engine.horsepower} HP</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Torque</span>
                        <span className="stat-value">{engine.torque} lb-ft</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h3>Performance & Efficiency</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Transmission</span>
                  <span className="spec-value">{specs.transmission || 'N/A'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Drivetrain</span>
                  <span className="spec-value">{specs.drivetrain || 'N/A'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">City MPG</span>
                  <span className="spec-value">{specs.mpg?.city || 'N/A'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Highway MPG</span>
                  <span className="spec-value">{specs.mpg?.highway || 'N/A'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Combined MPG</span>
                  <span className="spec-value">{specs.mpg?.combined || 'N/A'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fuel Tank</span>
                  <span className="spec-value">{specs.fuelCapacity ? `${specs.fuelCapacity} gal` : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className="dimension-specs">
            <div className="info-card">
              <h3>Exterior Dimensions</h3>
              <div className="specs-grid">
                {specs.dimensions ? (
                  <>
                    <div className="spec-item">
                      <span className="spec-label">Length</span>
                      <span className="spec-value">{specs.dimensions.length}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Width</span>
                      <span className="spec-value">{specs.dimensions.width}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Height</span>
                      <span className="spec-value">{specs.dimensions.height}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Wheelbase</span>
                      <span className="spec-value">{specs.dimensions.wheelbase}</span>
                    </div>
                    {specs.dimensions.groundClearance && (
                      <div className="spec-item">
                        <span className="spec-label">Ground Clearance</span>
                        <span className="spec-value">{specs.dimensions.groundClearance}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Dimension data not available</p>
                )}
              </div>
            </div>

            {specs.weight && (
              <div className="info-card">
                <h3>Weight</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Curb Weight</span>
                    <span className="spec-value">{specs.weight.curb}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Gross Weight</span>
                    <span className="spec-value">{specs.weight.gross}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="feature-specs">
            {specs.submodels && specs.submodels.length > 0 && (
              <div className="info-card">
                <h3>Available Trims</h3>
                <div className="trim-list">
                  {specs.submodels.map((trim, index) => (
                    <div key={index} className="trim-item">
                      <span className="trim-name">{trim}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {specs.safety && (
              <div className="info-card">
                <h3>Safety</h3>
                <div className="safety-content">
                  <div className="safety-rating">
                    <span className="rating-label">Safety Rating</span>
                    <div className="stars">
                      {'★'.repeat(specs.safety.rating)}{'☆'.repeat(5 - specs.safety.rating)}
                    </div>
                  </div>
                  {specs.safety.features && (
                    <div className="safety-features">
                      <h4>Standard Safety Features</h4>
                      <ul>
                        {specs.safety.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="color-specs">
            <div className="info-card">
              <h3>Available Colors</h3>
              {specs.colors ? (
                <>
                  <div className="color-section">
                    <h4>Exterior Colors ({specs.colors.exterior.length})</h4>
                    <div className="color-grid">
                      {specs.colors.exterior.map((color, index) => (
                        <div key={index} className="color-item">
                          <div 
                            className="color-swatch" 
                            style={{ background: getColorPreview(color) }}
                          />
                          <span className="color-name">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="color-section">
                    <h4>Interior Colors ({specs.colors.interior.length})</h4>
                    <div className="color-grid">
                      {specs.colors.interior.map((color, index) => (
                        <div key={index} className="color-item">
                          <div 
                            className="color-swatch" 
                            style={{ background: getColorPreview(color) }}
                          />
                          <span className="color-name">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p>Color options not available</p>
              )}
            </div>
          </div>
        )}
      </motion.div>

      <style jsx>{`
        .info-card {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        h2 {
          margin-bottom: 1.5rem;
        }

        h3 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .specs-grid.compact {
          gap: 1.5rem;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .specs-grid.compact .spec-item {
          align-items: center;
          text-align: center;
        }

        .spec-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .spec-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .spec-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .spec-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .spec-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          color: var(--text-secondary);
        }

        .spec-tab:hover {
          background: var(--bg-primary);
        }

        .spec-tab.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .tab-icon {
          font-size: 1.25rem;
        }

        .engine-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .engine-option {
          padding: 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
        }

        .engine-option h4 {
          margin-bottom: 0.75rem;
          color: var(--primary);
        }

        .engine-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .stat-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .trim-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.75rem;
        }

        .trim-item {
          padding: 0.75rem 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          border: 1px solid var(--border);
        }

        .safety-rating {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }

        .stars {
          color: var(--warning);
          font-size: 1.5rem;
        }

        .safety-features ul {
          list-style: none;
          padding: 0;
        }

        .safety-features li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .safety-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success);
          font-weight: bold;
        }

        .color-section {
          margin-bottom: 2rem;
        }

        .color-section h4 {
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
        }

        .color-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .color-swatch {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 2px solid var(--border);
          box-shadow: 0 2px 4px var(--shadow);
        }

        .color-name {
          font-size: 0.875rem;
          text-align: center;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .spec-tabs {
            gap: 0.25rem;
          }

          .spec-tab {
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }

          .tab-icon {
            display: none;
          }

          .engine-stats {
            grid-template-columns: 1fr;
          }

          .color-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }

          .color-swatch {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to generate color preview
function getColorPreview(colorName) {
  const colorMap = {
    'Pearl White': '#F8F8FF',
    'Midnight Black': '#000000',
    'Silver Metallic': '#C0C0C0',
    'Blue Crush': '#0066CC',
    'Ruby Red': '#9B111E',
    'Black': '#000000',
    'White': '#FFFFFF',
    'Gray': '#808080',
    'Red': '#FF0000',
    'Blue': '#0000FF',
    'Ash': '#B2BEB5',
    'Beige': '#F5F5DC',
    'Brown': '#964B00'
  };
  
  return colorMap[colorName] || `linear-gradient(45deg, #ccc 25%, #999 25%, #999 50%, #ccc 50%, #ccc 75%, #999 75%, #999)`;
}