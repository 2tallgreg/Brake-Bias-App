// components/layout/Header.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link href="/" className="logo">
          <div className="logo-img">BB</div>
          <span className="logo-text">Brake Bias</span>
        </Link>
        
        <nav className="nav-links">
          <Link href="/search">Search</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/about">About</Link>
        </nav>

        <ThemeSwitcher />
      </div>

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: var(--bg-secondary);
          padding: 1rem 0;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px var(--shadow);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .header.scrolled {
          padding: 0.75rem 0;
          box-shadow: 0 2px 8px var(--shadow);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
        }

        .logo-img {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}