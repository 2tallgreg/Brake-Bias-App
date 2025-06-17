// components/layout/ThemeSwitcher.jsx
'use client';

import { useTheme } from '@/components/providers/ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  // Map themes to rotation angles - adjusted for correct alignment
  const getRotation = () => {
    switch(theme) {
      case 'dark': return 240;   // Points to Auto position (but represents Dark)
      case 'light': return 120;  // Points to Dark position (but represents Light) 
      case 'auto': return 180;   // Points to Light position (but represents Auto)
      default: return 240;
    }
  };

  return (
    <div className="theme-switcher-container">
      <div 
        className="theme-switcher" 
        onClick={toggleTheme}
        role="button"
        tabIndex={0}
        aria-label={`Theme switcher: Currently ${theme} mode`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
          }
        }}
      >
        {/* Outer ring with markings */}
        <div className="switcher-base">
          {/* Position markers */}
          <div className="position-marker" style={{ transform: 'rotate(-60deg)' }}>
            <div className="marker-dot" />
          </div>
          <div className="position-marker" style={{ transform: 'rotate(0deg)' }}>
            <div className="marker-dot" />
          </div>
          <div className="position-marker" style={{ transform: 'rotate(60deg)' }}>
            <div className="marker-dot" />
          </div>
          
          {/* Knob */}
          <div 
            className="theme-knob" 
            style={{ transform: `rotate(${getRotation()}deg)` }}
          >
            <div className="knob-indicator" />
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="theme-labels">
        <span className={theme === 'dark' ? 'active' : ''}>Dark</span>
        <span className={theme === 'light' ? 'active' : ''}>Light</span>
        <span className={theme === 'auto' ? 'active' : ''}>Auto</span>
      </div>

      <style jsx>{`
        .theme-switcher-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .theme-switcher {
          width: 60px;
          height: 60px;
          cursor: pointer;
          user-select: none;
        }

        .theme-switcher:focus {
          outline: 2px solid var(--primary);
          outline-offset: 4px;
          border-radius: 50%;
        }

        .switcher-base {
          width: 100%;
          height: 100%;
          position: relative;
          background: radial-gradient(circle, #2a2a2a 0%, #1a1a1a 100%);
          border-radius: 50%;
          box-shadow: 
            inset 0 2px 4px rgba(0,0,0,0.8),
            inset 0 -2px 4px rgba(255,255,255,0.1),
            0 4px 8px rgba(0,0,0,0.3);
        }

        .position-marker {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .marker-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #666;
          border-radius: 50%;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
        }

        .theme-knob {
          position: absolute;
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          background: radial-gradient(circle at 35% 35%, #e0e0e0, #999);
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 3px 6px rgba(0,0,0,0.4),
            inset 0 -2px 3px rgba(0,0,0,0.2),
            inset 0 2px 3px rgba(255,255,255,0.3);
        }

        .knob-indicator {
          position: absolute;
          width: 4px;
          height: 30%;
          background: #333;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
          box-shadow: 
            inset 0 1px 2px rgba(0,0,0,0.3),
            0 1px 1px rgba(255,255,255,0.2);
        }

        .knob-indicator::before,
        .knob-indicator::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          background: #333;
          left: 0;
          border-radius: 1px;
        }

        .knob-indicator::before {
          top: -6px;
        }

        .knob-indicator::after {
          bottom: -6px;
        }

        .theme-labels {
          display: flex;
          gap: 12px;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .theme-labels span {
          transition: color 0.2s ease;
        }

        .theme-labels span.active {
          color: var(--primary);
          font-weight: 600;
        }

        /* Hover effect */
        .theme-switcher:hover .theme-knob {
          background: radial-gradient(circle at 35% 35%, #f0f0f0, #aaa);
        }

        /* Active/pressed effect */
        .theme-switcher:active .theme-knob {
          transform: rotate(${getRotation()}deg) scale(0.95);
        }

        @media (max-width: 768px) {
          .theme-switcher {
            width: 50px;
            height: 50px;
          }

          .theme-labels {
            font-size: 0.7rem;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}