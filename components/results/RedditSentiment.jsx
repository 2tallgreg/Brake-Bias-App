import React from 'react';

export default function RedditSentiment({ sentiment }) {
  if (!sentiment) {
     return <div><h2 className="section-title">Owner Sentiment</h2><p>No owner sentiment data available.</p></div>;
  }

  return (
    <div className="sentiment-section">
      <h2 className="section-title">Owner Sentiment (from Reddit)</h2>
      <div className="sentiment-card">
        <p className="sentiment-summary">"{sentiment.text}"</p>
        <div className="keywords">
            {sentiment.keywords?.positive?.length > 0 && 
              <div className="keyword-group">
                <h4>Common Praise</h4>
                <div className="tags">{sentiment.keywords.positive.map(k => <span key={k} className="tag positive">{k}</span>)}</div>
              </div>
            }
            {sentiment.keywords?.negative?.length > 0 && 
              <div className="keyword-group">
                <h4>Common Complaints</h4>
                <div className="tags">{sentiment.keywords.negative.map(k => <span key={k} className="tag negative">{k}</span>)}</div>
              </div>
            }
        </div>
      </div>
      <style jsx>{`
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-bottom: 2px solid var(--color-accent);
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
          margin-bottom: 1.5rem;
        }
        .keywords {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .keyword-group h4 {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
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
          background-color: #28a74520;
          color: #28a745;
        }
        .tag.negative {
          background-color: #dc354520;
          color: #dc3545;
        }
      `}</style>
    </div>
  );
}