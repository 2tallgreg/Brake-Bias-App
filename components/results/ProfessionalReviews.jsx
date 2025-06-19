// components/results/ProfessionalReviews.jsx
import React from 'react';

export default function ProfessionalReviews({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="reviews-section">
      <h2 className="section-title">Professional Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <h3 className="review-source">{review.source}</h3>
            <p className="review-snippet">"{review.snippet}"</p>
            <a href={review.url} target="_blank" rel="noopener noreferrer" className="review-link">
              Read Full Review &rarr;
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        .reviews-section {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .review-card {
          background-color: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border);
          padding: 1.5rem;
          margin-bottom: 1rem;
        }
        .review-source {
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }
        .review-snippet {
          font-style: italic;
          color: var(--text-secondary);
          margin: 0 0 1rem;
        }
        .review-link {
          font-weight: 600;
          color: var(--color-accent);
          text-decoration: none;
        }
        .review-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}