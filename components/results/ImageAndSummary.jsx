// components/results/ImageAndSummary.jsx
import React from 'react';
import Image from 'next/image';

export default function ImageAndSummary({ imageUrl, summary }) {
  if (!imageUrl && !summary) return null;

  return (
    <div className="summary-section">
      <h2 className="section-title">Overview</h2>
      <div className="card">
        {imageUrl && (
          <div className="image-container">
            <Image
              src={imageUrl}
              alt="Vehicle image from Wikimedia Commons"
              layout="fill"
              objectFit="cover"
              className="vehicle-image"
            />
          </div>
        )}
        {summary && <p className="summary-text">{summary}</p>}
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
        .card {
            background-color: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem;
        }
        .image-container {
            position: relative;
            width: 100%;
            height: 300px;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 1.5rem;
        }
        .summary-text {
            line-height: 1.7;
            color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}