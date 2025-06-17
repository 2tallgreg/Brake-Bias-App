// app/page.jsx
'use client';

import Link from 'next/link';
import SearchForm from '@/components/search/SearchForm';

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Brake Bias Car Reviews</h1>
        <p>The Metacritic of Cars - Aggregated Reviews from Professionals and Owners</p>
      </section>

      <section className="search-section">
        <h2>Search for Vehicle Reviews</h2>
        <SearchForm />
      </section>

      <section className="features">
        <h2>Why Brake Bias?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Professional Reviews</h3>
            <p>Aggregated reviews from MotorTrend, Car and Driver, Edmunds, and more</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Owner Sentiment</h3>
            <p>Real feedback from Reddit discussions and owner forums</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Market Pricing</h3>
            <p>Local and national pricing data to help you get the best deal</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>AI-Powered Insights</h3>
            <p>Smart summaries powered by OpenAI and Google Gemini</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 4rem 0;
          margin-bottom: 3rem;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .search-section {
          margin-bottom: 4rem;
        }

        .search-section h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .features {
          margin-bottom: 4rem;
        }

        .features h2 {
          text-align: center;
          margin-bottom: 3rem;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: var(--bg-secondary);
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          transition: transform 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          margin-bottom: 0.5rem;
        }

        .feature-card p {
          color: var(--text-secondary);
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}