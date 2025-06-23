// components/results/ProfessionalReviews.jsx
import React from 'react';

export default function ProfessionalReviews({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div><h2 className="section-title">Professional Reviews</h2><p>No professional reviews found.</p></div>;
  }

  return (
    <div className="reviews-section">
      <h2 className="section-title">Professional Reviews</h2>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <h3 className="review-source">{review.source} ({review.review_year}) - <span className={`sentiment ${review.sentiment?.toLowerCase().replace(/\s/g, '-')}`}>{review.sentiment}</span></h3>
            
            <p className="review-snippet">"{review.text}"</p>
            
            {review.tldr && review.tldr !== "Data Not Available" && (
              <p className="review-tldr"><strong>Summary:</strong> {review.tldr}</p>
            )}

            {review.link && <a href={review.link} target="_blank" rel="noopener noreferrer" className="review-link">Read Full Review &rarr;</a>}
            
            {(review.keywords?.positive?.length > 0 || review.keywords?.negative?.length > 0) &&
              <div className="keywords-container">
                {review.keywords.positive?.map(k => <span key={k} className="tag positive">{k}</span>)}
                {review.keywords.negative?.map(k => <span key={k} className="tag negative">{k}</span>)}
              </div>
            }
          </div>
        ))}
      </div>
      <style jsx>{`
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-bottom: 2px solid var(--primary);
          padding-bottom: 0.5rem;
        }
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .review-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .review-source {
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .sentiment {
          font-weight: bold;
        }
        .sentiment.positive, .sentiment.largely-positive { color: var(--success, #28a745); }
        .sentiment.negative, .sentiment.largely-negative { color: var(--danger, #dc3545); }
        .sentiment.mixed, .sentiment.neutral { color: var(--warning, #ffc107); }
        .review-snippet {
          font-style: italic;
          color: var(--text-secondary);
          padding-left: 1rem;
          border-left: 3px solid var(--border);
          margin: 0;
        }
        .review-tldr {
          font-size: 0.95rem;
          color: var(--text-secondary);
          padding: 0.75rem 1rem;
          background-color: var(--bg-primary);
          border-radius: 8px;
          border: 1px solid var(--border);
          margin: 0;
        }
        .review-tldr strong {
          color: var(--text-primary);
        }
        .review-link {
          font-weight: 600;
          color: var(--primary);
          text-decoration: none;
          align-self: flex-start;
        }
        .review-link:hover {
          text-decoration: underline;
        }
        .keywords-container {
          padding-top: 1rem;
          border-top: 1px solid var(--border);
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tag {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .tag.positive {
          background-color: rgba(40, 167, 69, 0.15);
          color: #28a745;
        }
        .tag.negative {
          background-color: rgba(220, 53, 69, 0.15);
          color: #dc3545;
        }
      `}</style>
    </div>
  );
}