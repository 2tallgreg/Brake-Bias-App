// app/not-found.jsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <p className="error-description">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="home-link">
        Return to Homepage
      </Link>
      <style jsx>{`
        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80vh;
          text-align: center;
          color: var(--text-primary);
        }
        .error-code {
          font-size: 6rem;
          font-weight: 800;
          color: var(--color-accent);
          margin: 0;
        }
        .error-message {
          font-size: 2rem;
          margin: 0 0 1rem;
        }
        .error-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        .home-link {
          padding: 0.75rem 1.5rem;
          background-color: var(--color-accent);
          color: var(--bg-primary);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .home-link:hover {
          background-color: var(--color-accent-hover);
        }
      `}</style>
    </div>
  );
}