// components/layout/ThemeSwitcher.jsx
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="theme-switcher-placeholder" />;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
        {resolvedTheme === 'dark' ? '🌙' : '☀️'}
      </button>
      <style jsx>{`
        .theme-switcher-placeholder {
            width: 40px;
            height: 40px;
        }
        .theme-toggle {
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}