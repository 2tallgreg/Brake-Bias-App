// components/results/RedditSentiment.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RedditSentiment({ reddit, variant = 'summary' }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!reddit) {
    return (
      <div className="info-card">
        <h3>Owner Sentiment</h3>
        <p>No Reddit discussions found for this vehicle.</p>
      </div>
    );
  }

  const sentimentPercentages = {
    positive: Math.round((reddit.sentiment.positive.length / 
      (reddit.sentiment.positive.length + reddit.sentiment.neutral.length + reddit.sentiment.negative.length)) * 100),
    neutral: Math.round((reddit.sentiment.neutral.length / 
      (reddit.sentiment.positive.length + reddit.sentiment.neutral.length + reddit.sentiment.negative.length)) * 100),
    negative: Math.round((reddit.sentiment.negative.length / 
      (reddit.sentiment.positive.length + reddit.sentiment.neutral.length + reddit.sentiment.negative.length)) * 100)
  };

  const SentimentBar = () => (
    <div className="sentiment-bar">
      <div 
        className="sentiment-segment positive" 
        style={{ width: `${sentimentPercentages.positive}%` }}
        title={`Positive: ${sentimentPercentages.positive}%`}
      >
        {sentimentPercentages.positive > 10 && `${sentimentPercentages.positive}%`}
      </div>
      <div 
        className="sentiment-segment neutral" 
        style={{ width: `${sentimentPercentages.neutral}%` }}
        title={`Neutral: ${sentimentPercentages.neutral}%`}
      >
        {sentimentPercentages.neutral > 10 && `${sentimentPercentages.neutral}%`}
      </div>
      <div 
        className="sentiment-segment negative" 
        style={{ width: `${sentimentPercentages.negative}%` }}
        title={`Negative: ${sentimentPercentages.negative}%`}
      >
        {sentimentPercentages.negative > 10 && `${sentimentPercentages.negative}%`}
      </div>
    </div>
  );

  if (variant === 'summary') {
    return (
      <div className="info-card">
        <h3>Owner Sentiment</h3>
        <div className="reddit-stats">
          <span>📊 {reddit.totalPosts} discussions analyzed</span>
          <span>📍 From {reddit.subreddits.join(', ')}</span>
        </div>
        <SentimentBar />
        <div className="sentiment-summary">
          <div className="sentiment-group">
            <h5 className="positive">What Owners Love</h5>
            <div className="sentiment-tiles">
              {reddit.sentiment.positive.slice(0, 3).map((item, index) => (
                <span key={index} className="sentiment-tile positive">{item}</span>
              ))}
            </div>
          </div>
          <div className="sentiment-group">
            <h5 className="negative">Common Complaints</h5>
            <div className="sentiment-tiles">
              {reddit.sentiment.negative.slice(0, 3).map((item, index) => (
                <span key={index} className="sentiment-tile negative">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Detailed view
  return (
    <div className="reddit-sentiment-detailed">
      <h2>Owner Reviews & Discussions</h2>
      
      <div className="info-card overview-card">
        <div className="reddit-header">
          <div className="reddit-stats">
            <div className="stat">
              <span className="stat-icon">💬</span>
              <span className="stat-text">{reddit.totalPosts} discussions analyzed</span>
            </div>
            <div className="stat">
              <span className="stat-icon">📱</span>
              <span className="stat-text">From {reddit.subreddits.join(', ')}</span>
            </div>
            <div className="stat">
              <span className="stat-icon">😊</span>
              <span className="stat-text">{Math.round(reddit.sentimentScore * 100)}% positive sentiment</span>
            </div>
          </div>
        </div>
        
        <h4>Overall Sentiment Distribution</h4>
        <SentimentBar />
        
        <p className="overall-sentiment">{reddit.overallSentiment}</p>
      </div>

      <div className="sentiment-categories">
        <div className="category-tabs">
          <button 
            className={`tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Topics
          </button>
          <button 
            className={`tab ${selectedCategory === 'positive' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('positive')}
          >
            Positive ({reddit.sentiment.positive.length})
          </button>
          <button 
            className={`tab ${selectedCategory === 'neutral' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('neutral')}
          >
            Neutral ({reddit.sentiment.neutral.length})
          </button>
          <button 
            className={`tab ${selectedCategory === 'negative' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('negative')}
          >
            Negative ({reddit.sentiment.negative.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="sentiment-content"
          >
            {selectedCategory === 'all' && (
              <div className="all-sentiments">
                <div className="sentiment-section">
                  <h4 className="section-title positive">✓ What Owners Love</h4>
                  <div className="sentiment-tiles">
                    {reddit.sentiment.positive.map((item, index) => (
                      <motion.span
                        key={index}
                        className="sentiment-tile positive"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="sentiment-section">
                  <h4 className="section-title neutral">◐ Mixed Opinions</h4>
                  <div className="sentiment-tiles">
                    {reddit.sentiment.neutral.map((item, index) => (
                      <motion.span
                        key={index}
                        className="sentiment-tile neutral"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="sentiment-section">
                  <h4 className="section-title negative">✗ Common Complaints</h4>
                  <div className="sentiment-tiles">
                    {reddit.sentiment.negative.map((item, index) => (
                      <motion.span
                        key={index}
                        className="sentiment-tile negative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedCategory !== 'all' && (
              <div className="filtered-sentiments">
                <div className="sentiment-tiles large">
                  {reddit.sentiment[selectedCategory].map((item, index) => (
                    <motion.span
                      key={index}
                      className={`sentiment-tile ${selectedCategory}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {reddit.commonTopics && reddit.commonTopics.length > 0 && (
        <div className="info-card">
          <h3>Most Discussed Topics</h3>
          <div className="topics-list">
            {reddit.commonTopics.map((topic, index) => (
              <div key={index} className="topic-item">
                <span className="topic-number">{index + 1}</span>
                <span className="topic-text">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {reddit.sampleComments && reddit.sampleComments.length > 0 && (
        <div className="info-card">
          <h3>What Real Owners Are Saying</h3>
          <div className="comments-list">
            {reddit.sampleComments.map((comment, index) => (
              <motion.div 
                key={index} 
                className="comment-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-votes">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                    {comment.upvotes}
                  </span>
                </div>
                <p className="comment-text">"{comment.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .info-card {
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

        .reddit-stats {
          display: flex;
          gap: 1.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .reddit-header {
          margin-bottom: 1.5rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-icon {
          font-size: 1.25rem;
        }

        .sentiment-bar {
          display: flex;
          height: 40px;
          border-radius: 20px;
          overflow: hidden;
          margin: 1rem 0;
          box-shadow: 0 2px 4px var(--shadow);
        }

        .sentiment-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .sentiment-segment.positive {
          background-color: var(--success);
        }

        .sentiment-segment.neutral {
          background-color: var(--neutral);
        }

        .sentiment-segment.negative {
          background-color: var(--danger);
        }

        .sentiment-summary {
          margin-top: 1.5rem;
        }

        .sentiment-group {
          margin-bottom: 1rem;
        }

        .sentiment-group h5 {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .sentiment-group h5.positive {
          color: var(--success);
        }

        .sentiment-group h5.negative {
          color: var(--danger);
        }

        .overall-sentiment {
          margin-top: 1rem;
          font-size: 1.125rem;
          color: var(--text-primary);
          font-style: italic;
        }

        .category-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
        }

        .tab {
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          color: var(--text-secondary);
        }

        .tab:hover {
          background: var(--bg-primary);
        }

        .tab.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .sentiment-tiles {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .sentiment-tiles.large {
          gap: 0.75rem;
        }

        .sentiment-tile {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          transition: all 0.2s ease;
          cursor: default;
        }

        .sentiment-tiles.large .sentiment-tile {
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
        }

        .sentiment-tile:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px var(--shadow);
        }

        .sentiment-tile.positive {
          background-color: var(--success);
        }

        .sentiment-tile.neutral {
          background-color: var(--neutral);
        }

        .sentiment-tile.negative {
          background-color: var(--danger);
        }

        .sentiment-section {
          margin-bottom: 2rem;
        }

        .section-title {
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }

        .section-title.positive {
          color: var(--success);
        }

        .section-title.neutral {
          color: var(--neutral);
        }

        .section-title.negative {
          color: var(--danger);
        }

        .topics-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .topic-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: var(--bg-primary);
          border-radius: 8px;
        }

        .topic-number {
          width: 32px;
          height: 32px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .topic-text {
          flex: 1;
          color: var(--text-primary);
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .comment-item {
          padding: 1rem;
          background: var(--bg-primary);
          border-radius: 8px;
          border-left: 3px solid var(--primary);
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .comment-author {
          font-weight: 600;
          color: var(--primary);
        }

        .comment-votes {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--text-secondary);
        }

        .comment-text {
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .reddit-stats {
            font-size: 0.75rem;
            gap: 1rem;
          }

          .sentiment-bar {
            height: 32px;
          }

          .sentiment-segment {
            font-size: 0.75rem;
          }

          .category-tabs {
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
          }

          .sentiment-tiles {
            gap: 0.375rem;
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