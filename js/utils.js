const Utils = {
    // Show loading screen
    showLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.add('fade-in');
    },
    
    // Hide loading screen
    hideLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.remove('fade-in');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    },
    
    // Update loading text
    updateLoadingText(text) {
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = text;
        }
    },
    
    // Show alert message
    showAlert(message, type = 'error') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Add to page
        document.body.appendChild(alert);
        
        // Animate in
        setTimeout(() => alert.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    },
    
    // Smooth scroll to element
    scrollToResults() {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            resultsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    },
    
    // Simulate API delay (for demo purposes)
    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // Validate zip code
    isValidZipCode(zipcode) {
        return /^\d{5}$/.test(zipcode);
    },
    
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },
    
    // Debounce function for search inputs
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Get user's location from browser
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                { timeout: 5000 }
            );
        });
    },
    
    // Convert coordinates to zip code (requires reverse geocoding API)
    async coordsToZipCode(latitude, longitude) {
        // This would require a reverse geocoding API
        // For now, return null
        return null;
    },
    
    // Save search to local storage
    saveRecentSearch(vehicleInfo) {
        const searches = this.getRecentSearches();
        
        // Add new search to beginning
        searches.unshift({
            ...vehicleInfo,
            timestamp: Date.now()
        });
        
        // Keep only last 10 searches
        const recentSearches = searches.slice(0, 10);
        
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    },
    
    // Get recent searches
    getRecentSearches() {
        const stored = localStorage.getItem('recentSearches');
        return stored ? JSON.parse(stored) : [];
    },
    
    // Check if running on mobile
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Add fade-in animation to elements
    addFadeInAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
};