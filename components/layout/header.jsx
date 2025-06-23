// components/layout/Header.jsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo-link">
          <Image src="/logo.jpg" alt="Brake Bias Logo" width={40} height={40} className="logo-image" />
          <span className="logo-text">Brake Bias</span>
        </Link>
        <nav className="site-nav">
          <Link href="/about">About</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/feed">Feed</Link>
        </nav>
        <div className="theme-switcher-container">
            <ThemeSwitcher />
        </div>
      </div>
      <style jsx>{`
        .site-header {
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border);
            padding: 0 2rem;
            position: sticky;
            top: 0;
            z-index: 50;
        }
        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
        }
        .logo-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 700;
            font-size: 1.25rem;
            color: var(--text-primary);
        }
        .logo-link:hover {
            text-decoration: none;
        }
        .logo-image {
            border-radius: 8px;
        }
        .site-nav {
            display: flex;
            gap: 2rem;
            font-weight: 500;
        }
        .theme-switcher-container {
          /* Placeholder for alignment */
        }
      `}</style>
    </header>
  );
}