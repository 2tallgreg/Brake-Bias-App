// app/not-found.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <motion.div 
        className="not-found-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="error-404"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1 
          }}
        >
          <span className="four">4</span>
          <motion.span 
            className="tire"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            🛞
          </motion.span>
          <span className="four">4</span>
        </motion.div>

        <h1>Page Not Found</h1>
        <p>Looks like this page took a wrong turn!</p>

        <div className="actions">
          <Link href="/" className="home-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </Link>
          
          <Link href="/search" className="search-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Search Vehicles
          </Link>
        </div>

        <div className="suggestions">
          <p>Popular searches:</p>
          <div className="popular-links">
            <Link href="/results?year=2024&make=Toyota&model=Camry">2024 Toyota Camry</Link>
            <Link href="/results?year=2024&make=Honda&model=CR-V">2024 Honda CR-V</Link>
            <Link href="/results?year=2024&make=Ford&model=F-150">2024 Ford F-150</Link>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .not-found-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .not-found-content {
          text-align: center;
          max-width: 600px;
        }

        .error-404 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          font-size: 5rem;
          font-weight: 900;
          color: var(--primary);
        }

        .four {
          display: inline-block;
        }

        .tire {
          display: inline-block;
          font-size: 4rem;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .home-link, .search-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .home-link {
          background: var(--primary);
          color: white;
        }

        .home-link:hover {
          background: #0051D5;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        .search-link {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .search-link:hover {
          border-color: var(--primary);
          background: var(--bg-primary);
        }

        .suggestions {
          margin-top: 3rem;
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: 12px;
        }

        .suggestions p {
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .popular-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .popular-links a {
          padding: 0.5rem 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-primary);
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .popular-links a:hover {
          background: var(--primary);
          color: white;
        }

        @media (max-width: 768px) {
          .error-404 {
            font-size: 3rem;
          }

          .tire {
            font-size: 2.5rem;
          }

          h1 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }

          .actions {
            flex-direction: column;
            width: 100%;
          }

          .home-link, .search-link {
            width: 100%;
            justify-content: center;
          }

          .popular-links {
            flex-direction: column;
          }

          .popular-links a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}