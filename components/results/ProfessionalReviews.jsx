// components/results/ProfessionalReviews.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfessionalReviews({ reviews = [], summary, variant = 'summary' }) {
  const [expandedReview, setExpandedReview] = useState(null);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="info-card">
        <h3>Professional Reviews</h3>
        <p>No professional reviews available for this vehicle.</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="star-rating">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(emptyStars)}
        <span className="rating-number">{rating}/5</span>
      </span>
    );
  };

  const SentimentTiles = ({ pros = [], cons = [] }) => (
    <div className="sentiment-tiles">
      {pros.map((pro, index) => (
        <motion.span
          key={`pro-${index}`}
          className="sentiment-tile positive"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {pro}
        </motion.span>
      ))}
      {cons.map((con, index) => (
        <motion.span
          key={`con-${index}`}
          className="sentiment-tile negative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: (pros.length + index) * 0.05 }}
        >
          {con}
        </motion.span>
      ))}
    </div>
  );

  if (variant === 'summary') {
    return (
      <div className="info-card">
        <h3>Professional Reviews Summary</h3>
        {summary && (
          <div className="summary-section">
            <p className="consensus">{summary.consensus}</p>
            <div className="average-rating">
              {renderStars(summary.averageRating)}
              <span className="review-count">Based on {reviews.length} reviews</span>
            </div>
          </div>
        )}
        <div className="review-highlights">
          {reviews.slice(0, 2).map((review, index) => (
            <div key={index} className="review-highlight">
              <div className="review-source">{review.source}</div>
              <p className="review-snippet">"{review.snippet}"</p>
            </div>
          ))}
        </div>
        {summary && <SentimentTiles pros={summary.commonPros} cons={summary.commonCons} />}
      </div>
    );
  }

  return (
    <div className="professional-reviews-detailed">
      <h2>Professional Reviews</h2>
      
      {summary && (
        <div className="info-card summary-card">
          <h3>Overall Consensus</h3>
          <p className="consensus">{summary.consensus}</p>
          <div className="average-rating large">
            {renderStars(summary.averageRating)}
            <span className="review-count">Average from {reviews.length} professional reviews</span>
          </div>
          <SentimentTiles pros={summary.commonPros} cons={summary.commonCons} />
        </div>
      )}

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="review-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div 
              className="review-header"
              onClick={() => setExpandedReview(expandedReview === index ? null : index)}
            >
              <div className="review-meta">
                <h4 className="review-source">{review.source}</h4>
                <div className="review-rating">{renderStars(review.rating)}</div>
              </div>
              <button className="expand-button">
                {expandedReview === index ? '−' : '+'}
              </button>
            </div>

            <p className="review-snippet">"{review.snippet}"</p>

            <AnimatePresence>
              {expandedReview === index && (
                <motion.div
                  className="review-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pros-cons-grid">
                    <div className="pros-section">
                      <h5>✓ Pros</h5>
                      <ul>
                        {review.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons-section">
                      <h5>✗ Cons</h5>
                      <ul>
                        {review.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {review.verdict && (
                    <div className="verdict">
                      <strong>Verdict:</strong> {review.verdict}
                    </div>
                  )}
                  <a 
                    href={review.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-full"
                  >
                    Read Full Review →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .info-card, .review-card {
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

        .summary-section {
          margin-bottom: 1.5rem;
        }

        .consensus {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .average-rating {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .average-rating.large {
          font-size: 1.25rem;
        }

        .star-rating {
          color: var(--warning);
          font-size: 1.25rem;
        }

        .rating-number {
          margin-left: 0.5rem;
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .review-count {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .review-highlights {
          margin: 1.5rem 0;
        }

        .review-highlight {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .review-highlight:last-child {
          border-bottom: none;
        }

        .review-source {
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .review-snippet {
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .sentiment-tiles {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .sentiment-tile {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          transition: transform 0.2s ease;
        }

        .sentiment-tile:hover {
          transform: translateY(-2px);
        }

        .sentiment-tile.positive {
          background-color: var(--success);
        }

        .sentiment-tile.negative {
          background-color: var(--danger);
        }

        .sentiment-tile.neutral {
          background-color: var(--neutral);
        }

        .review-card {
          cursor: pointer;
          transition: box-shadow 0.2s ease;
        }

        .review-card:hover {
          box-shadow: 0 4px 12px var(--shadow);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .review-meta h4 {
          margin-bottom: 0.5rem;
        }

        .expand-button {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .expand-button:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .review-details {
          overflow: hidden;
          margin-top: 1rem;
        }

        .pros-cons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 1rem 0;
        }

        .pros-section h5 {
          color: var(--success);
          margin-bottom: 0.5rem;
        }

        .cons-section h5 {
          color: var(--danger);
          margin-bottom: 0.5rem;
        }

        .pros-section ul, .cons-section ul {
          list-style: none;
          padding: 0;
        }

        .pros-section li, .cons-section li {
          padding: 0.25rem 0;
          color: var(--text-secondary);
        }

        .verdict {
          margin: 1rem 0;
          padding: 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
          color: var(--text-primary);
        }

        .read-full {
          display: inline-block;
          margin-top: 1rem;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
        }

        .read-full:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .pros-cons-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .sentiment-tiles {
            gap: 0.25rem;
          }

          .sentiment-tile {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}