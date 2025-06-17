// components/common/ErrorMessage.jsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ErrorMessage({ error, onRetry }) {
  const errorTypes = {
    404: {
      icon: '🔍',
      title: 'Vehicle Not Found',
      message: "We couldn't find reviews for this vehicle. It might be too new or too rare.",
      suggestions: [
        'Check the year, make, and model',
        'Try a different trim level',
        'Search for a similar vehicle'
      ]
    },
    network: {
      icon: '🌐',
      title: 'Connection Issue',
      message: 'Unable to connect to our servers. Please check your internet connection.',
      suggestions: [
        'Check your internet connection',
        'Try refreshing the page',
        'Wait a moment and try again'
      ]
    },
    timeout: {
      icon: '⏱️',
      title: 'Request Timed Out',
      message: 'The request took too long to complete. This might be due to high traffic.',
      suggestions: [
        'Try again in a few moments',
        'Reduce the search complexity',
        'Check your connection speed'
      ]
    },
    default: {
      icon: '⚠️',
      title: 'Something Went Wrong',
      message: error || 'An unexpected error occurred while fetching vehicle data.',
      suggestions: [
        'Try refreshing the page',
        'Clear your browser cache',
        'Contact support if the issue persists'
      ]
    }
  };

  const getErrorType = () => {
    if (error?.includes('404') || error?.includes('not found')) return errorTypes[404];
    if (error?.includes('network') || error?.includes('fetch')) return errorTypes.network;
    if (error?.includes('timeout')) return errorTypes.timeout;
    return errorTypes.default;
  };

  const currentError = getErrorType();

  return (
    <motion.div 
      className="error-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="error-content">
        <motion.div 
          className="error-icon"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentError.icon}
        </motion.div>

        <h2 className="error-title">{currentError.title}</h2>
        <p className="error-message">{currentError.message}</p>

        <div className="suggestions">
          <h3>What can you do?</h3>
          <ul>
            {currentError.suggestions.map((suggestion, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {suggestion}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="error-actions">
          {onRetry && (
            <motion.button 
              className="btn btn-primary"
              onClick={onRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              Try Again
            </motion.button>
          )}
          
          <Link href="/" className="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to Search
          </Link>
        </div>

        <div className="error-code">
          Error Details: {error || 'Unknown error'}
        </div>
      </div>

      <style jsx>{`
        .error-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .error-content {
          max-width: 600px;
          text-align: center;
          background: var(--bg-secondary);
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px var(--shadow);
        }

        .error-icon {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .error-title {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .error-message {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .suggestions {
          text-align: left;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--bg-primary);
          border-radius: 8px;
        }

        .suggestions h3 {
          font-size: 1rem;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .suggestions ul {
          list-style: none;
          padding: 0;
        }

        .suggestions li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: var(--text-secondary);
        }

        .suggestions li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--primary);
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          border: none;
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
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .btn-secondary {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .btn-secondary:hover {
          background: var(--bg-secondary);
          border-color: var(--primary);
        }

        .error-code {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          font-family: monospace;
          padding: 0.5rem 1rem;
          background: var(--bg-primary);
          border-radius: 4px;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .error-content {
            padding: 2rem;
          }

          .error-icon {
            font-size: 4rem;
          }

          .error-title {
            font-size: 1.5rem;
          }

          .error-message {
            font-size: 1rem;
          }

          .error-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </motion.div>
  );
}