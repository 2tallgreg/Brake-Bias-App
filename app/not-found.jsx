// app/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <p className="error-description">
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link href="/" className="home-link">
        Go Back to Homepage
      </Link>
      
      <style jsx>{`
        .not-found-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 80vh;
          padding: 2rem;
        }
        .error-code {
          font-size: 6rem;
          font-weight: 900;
          color: var(--primary);
          line-height: 1;
        }
        .error-message {
          font-size: 1.75rem;
          margin-top: 0.5rem;
          color: var(--text-secondary);
        }
        .error-description {
          margin-top: 1rem;
          max-width: 400px;
          color: var(--text-tertiary);
        }
        .home-link {
          margin-top: 2rem;
          padding: 0.75rem 1.5rem;
          background-color: var(--primary);
          color: white;
          border-radius: 8px;
          font-weight: 600;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .home-link:hover {
          transform: translateY(-2px);
          opacity: 0.9;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}