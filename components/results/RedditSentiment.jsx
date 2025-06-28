// components/results/RedditSentiment.jsx
import React from 'react';

export default function RedditSentiment({ sentiment }) {
  // A more robust check for the sentiment data object and its text property
  if (!sentiment || !sentiment.text) {
     return (
        <div className="sentiment-section">
            <h2 className="section-title">Owner Sentiment (from Reddit)</h2>
            <div className="sentiment-card">
                <p className="sentiment-summary">No owner sentiment data is available for this vehicle.</p>
            </div>
        </div>
     );
  }

  const hasPositiveKeywords = sentiment.keywords?.positive?.length > 0;
  const hasNegativeKeywords = sentiment.keywords?.negative?.length > 0;

  return (
    <div className="sentiment-section">
      <h2 className="section-title">Owner Sentiment (from Reddit)</h2>
      <div className="sentiment-card">
        <p className="sentiment-summary">"{sentiment.text}"</p>
        
        {(hasPositiveKeywords || hasNegativeKeywords) && (
            <div className="keywords-container">
                {hasPositiveKeywords && (
                  <div className="keyword-group">
                    <h4 className="keyword-title positive">Common Praise</h4>
                    <div className="tags">{sentiment.keywords.positive.map(k => <span key={k} className="tag positive">{k}</span>)}</div>
                  </div>
                )}
                {hasNegativeKeywords && (
                  <div className="keyword-group">
                    <h4 className="keyword-title negative">Common Complaints</h4>
                    <div className="tags">{sentiment.keywords.negative.map(k => <span key={k} className="tag negative">{k}</span>)}</div>
                  </div>
                )}
            </div>
        )}
      </div>
      <style jsx>{`
        .sentiment-section {
          margin-top: 2rem;
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-bottom: 2px solid var(--primary);
          padding-bottom: 0.5rem;
        }
        .sentiment-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .sentiment-summary {
          font-style: italic;
          color: var(--text-secondary);
          padding-left: 1rem;
          border-left: 3px solid var(--border);
          margin: 0;
        }
        .keywords-container {
          padding-top: 1.5rem;
          margin-top: 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .keyword-group h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .keyword-title.positive { color: var(--success, #28a745); }
        .keyword-title.negative { color: var(--danger, #dc3545); }
        .tags {
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