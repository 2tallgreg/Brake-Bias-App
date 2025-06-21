// app/about/page.jsx
'use client'; // <-- Add this line at the very top

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">About Brake Bias</h1>
      <p className="tagline">"Stop Guessing. Start Driving." </p>

      <div className="content-section">
        <h2>Our Mission</h2>
        <p>
          Brake Bias exists to bring clarity to car culture by aggregating expert reviews, real-owner feedback, and enthusiast insight into one definitive platform.  We empower buyers, drivers, and dreamers to make informed decisions by cutting through manufacturer hype and forum noise. 
        </p>
      </div>

      <div className="content-section">
        <h2>Our Philosophy</h2>
        <p>
          Whether you're shopping for your next ride or defending your current one, Brake Bias is your source for honest, bias-aware car reviews—because every car has a story, and we believe the truth is somewhere between the spec sheet and the subreddit. 
        </p>
        <p>
          Our tone is confident, technical, and slightly sarcastic. We're aimed at the enthusiasts and data-heads who still like to laugh. 
        </p>
      </div>

      <div className="content-section">
        <h2>How It Works</h2>
        <p>
          We use a combination of modern web technologies and artificial intelligence to create a comprehensive profile for each vehicle. Our system scours the web for professional reviews, dives into forums like Reddit to gauge real-world owner sentiment, and pulls in technical specifications and market data. All of this is then compiled into the easy-to-digest format you see on our results pages.
        </p>
      </div>
      
      <Link href="/" className="home-button">
        Start a New Search
      </Link>

      <style jsx>{`
        .page-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 2rem 3rem;
          background: var(--bg-secondary);
          border-radius: 16px;
          border: 1px solid var(--border);
        }
        .page-title {
          font-size: 2.5rem;
          text-align: center;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .tagline {
            text-align: center;
            font-size: 1.2rem;
            color: var(--primary);
            margin-bottom: 3rem;
            font-style: italic;
        }
        .content-section {
          margin-bottom: 2.5rem;
        }
        .content-section h2 {
          font-size: 1.75rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--primary);
        }
        .content-section p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }
        .home-button {
            display: block;
            width: fit-content;
            margin: 2rem auto 0;
            padding: 0.75rem 1.5rem;
            background-color: var(--primary);
            color: white;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: transform 0.2s ease;
        }
        .home-button:hover {
            transform: translateY(-2px);
            opacity: 0.95;
            text-decoration: none;
        }
      `}</style>
    </div>
  );
}