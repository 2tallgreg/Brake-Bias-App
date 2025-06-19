import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const themes = ['light', 'dark', 'system'];

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-20 h-24" />;

  const cycleTheme = () => {
    const currentThemeIndex = themes.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextThemeIndex]);
  };

  const getRotation = () => {
    switch (theme) {
      case 'dark': return 'rotate-[80deg]';
      case 'system': return 'rotate-[-80deg]';
      default: return 'rotate-0';
    }
  };
  
  const getIndicatorText = () => {
     switch (theme) {
      case 'dark': return 'ON';
      case 'system': return 'AUTO';
      default: return 'PARK';
    }
  }

  return (
    <div className="flex flex-col items-center">
        <button
            onClick={cycleTheme}
            className="w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-600 shadow-lg flex items-center justify-center relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500"
            aria-label="Toggle theme"
        >
            <div className={`w-full h-full transform transition-transform duration-300 ease-in-out ${getRotation()}`}>
                 <div className="w-4 h-1 bg-red-500 absolute top-1/2 left-0 transform -translate-y-1/2 rounded-r-sm"></div>
            </div>
        </button>
        <div className="mt-2 text-xs font-bold tracking-widest text-gray-400">
            {getIndicatorText()}
        </div>
    </div>
  );
};

export default ThemeSwitcher;