// components/results/RedditSentiment.jsx
import React from 'react';

export default function RedditSentiment({ sentiment }) {
    if (!sentiment) return null;
    
    const total = sentiment.positive + sentiment.negative + sentiment.neutral;
    const positivePercent = (sentiment.positive / total) * 100;
    const negativePercent = (sentiment.negative / total) * 100;
    const neutralPercent = (sentiment.neutral / total) * 100;

  return (
    <div className="sentiment-section">
      <h2 className="section-title">Reddit Sentiment</h2>
      <div className="sentiment-summary">
          <p>Based on <strong>{total}</strong> comments</p>
      </div>
      <div className="sentiment-bar">
        <div className="sentiment-positive" style={{ width: `${positivePercent}%` }}></div>
        <div className="sentiment-neutral" style={{ width: `${neutralPercent}%` }}></div>
        <div className="sentiment-negative" style={{ width: `${negativePercent}%` }}></div>
      </div>
      <div className="sentiment-legend">
          <div className="legend-item"><span className="dot positive"></span> Positive ({Math.round(positivePercent)}%)</div>
          <div className="legend-item"><span className="dot neutral"></span> Neutral ({Math.round(neutralPercent)}%)</div>
          <div className="legend-item"><span className="dot negative"></span> Negative ({Math.round(negativePercent)}%)</div>
      </div>
      <style jsx>{`
        .sentiment-section {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .sentiment-summary {
            color: var(--text-secondary);
            margin-bottom: 1rem;
        }
        .sentiment-bar {
          display: flex;
          height: 20px;
          border-radius: 10px;
          overflow: hidden;
          background-color: var(--border);
        }
        .sentiment-positive { background-color: #28a745; }
        .sentiment-neutral { background-color: #ffc107; }
        .sentiment-negative { background-color: #dc3545; }
        .sentiment-legend {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1rem;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        .legend-item {
            display: flex;
            align-items: center;
        }
        .dot {
            height: 12px;
            width: 12px;
            border-radius: 50%;
            margin-right: 0.5rem;
        }
        .dot.positive { background-color: #28a745; }
        .dot.neutral { background-color: #ffc107; }
        .dot.negative { background-color: #dc3545; }
      `}</style>
    </div>
  );
}