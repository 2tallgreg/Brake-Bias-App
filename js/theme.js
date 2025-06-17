const ThemeManager = {
    themes: ['dark', 'light', 'auto'],
    currentIndex: 0,
    
    init() {
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('brakeBiasTheme') || 'dark';
        this.currentIndex = this.themes.indexOf(savedTheme);
        
        // Apply initial theme
        this.apply(savedTheme);
        
        // Set up theme switcher
        const switcher = document.querySelector('.theme-switcher');
        if (switcher) {
            switcher.setAttribute('data-theme', savedTheme);
            switcher.addEventListener('click', () => this.toggle());
            
            // Add keyboard accessibility
            switcher.setAttribute('tabindex', '0');
            switcher.setAttribute('role', 'button');
            switcher.setAttribute('aria-label', 'Theme switcher');
            
            switcher.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle();
                }
            });
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.themes[this.currentIndex] === 'auto') {
                this.apply('auto');
            }
        });
    },
    
    toggle() {
        // Cycle through themes
        this.currentIndex = (this.currentIndex + 1) % this.themes.length;
        const newTheme = this.themes[this.currentIndex];
        
        // Update switcher appearance
        const switcher = document.querySelector('.theme-switcher');
        switcher.setAttribute('data-theme', newTheme);
        
        // Apply and save theme
        this.apply(newTheme);
        localStorage.setItem('brakeBiasTheme', newTheme);
        
        // Announce change for screen readers
        this.announceThemeChange(newTheme);
    },
    
    apply(theme) {
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechanged', { 
            detail: { theme: theme }
        }));
    },
    
    getCurrentTheme() {
        return this.themes[this.currentIndex];
    },
    
    getEffectiveTheme() {
        const current = this.getCurrentTheme();
        if (current === 'auto') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return current;
    },
    
    announceThemeChange(theme) {
        // Create invisible announcement element for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        announcement.textContent = `Theme changed to ${theme}`;
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
};