// search.js - Search functionality and results display
const Search = {
    // Vehicle database (in production, fetch from API)
    vehicleDatabase: {
        'Acura': ['ILX', 'TLX', 'RDX', 'MDX', 'NSX', 'Integra'],
        'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale'],
        'Aston Martin': ['DB11', 'DBX', 'Vantage', 'DBS'],
        'Audi': ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'e-tron GT', 'RS3', 'RS5', 'RS6', 'RS7', 'R8', 'TT'],
        'Bentley': ['Continental GT', 'Flying Spur', 'Bentayga'],
        'BMW': ['2 Series', '3 Series', '4 Series', '5 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'XM', 'M2', 'M3', 'M4', 'M5', 'M8', 'Z4', 'i4', 'iX', 'i7'],
        'Buick': ['Enclave', 'Encore', 'Encore GX', 'Envision'],
        'Cadillac': ['CT4', 'CT5', 'XT4', 'XT5', 'XT6', 'Escalade', 'Escalade-V', 'Lyriq'],
        'Chevrolet': ['Spark', 'Sonic', 'Malibu', 'Camaro', 'Corvette', 'Trax', 'Trailblazer', 'Equinox', 'Blazer', 'Traverse', 'Tahoe', 'Suburban', 'Colorado', 'Silverado 1500', 'Silverado HD', 'Bolt EV', 'Bolt EUV'],
        'Chrysler': ['300', 'Pacifica', 'Voyager'],
        'Dodge': ['Charger', 'Challenger', 'Durango', 'Hornet'],
        'Ferrari': ['296 GTB', '812', 'F8', 'SF90', 'Roma', 'Portofino', 'Purosangue'],
        'Fiat': ['500X'],
        'Ford': ['EcoSport', 'Escape', 'Bronco Sport', 'Edge', 'Bronco', 'Explorer', 'Expedition', 'Mustang', 'Mustang Mach-E', 'Maverick', 'Ranger', 'F-150', 'F-150 Lightning', 'Super Duty'],
        'Genesis': ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80', 'Electrified G80', 'Electrified GV70'],
        'GMC': ['Terrain', 'Acadia', 'Yukon', 'Canyon', 'Sierra 1500', 'Sierra HD', 'Hummer EV'],
        'Honda': ['Civic', 'Insight', 'Accord', 'HR-V', 'CR-V', 'Passport', 'Pilot', 'Ridgeline', 'Odyssey', 'CR-V Hybrid', 'Accord Hybrid'],
        'Hyundai': ['Accent', 'Venue', 'Elantra', 'Sonata', 'Kona', 'Tucson', 'Santa Fe', 'Santa Cruz', 'Palisade', 'Nexo', 'Ioniq 5', 'Ioniq 6'],
        'Infiniti': ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80'],
        'Jaguar': ['XE', 'XF', 'F-Type', 'E-Pace', 'F-Pace', 'I-Pace'],
        'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Grand Cherokee L', 'Wrangler', 'Gladiator', 'Wagoneer', 'Grand Wagoneer'],
        'Kia': ['Rio', 'Forte', 'K5', 'Stinger', 'Soul', 'Seltos', 'Sportage', 'Sorento', 'Telluride', 'Carnival', 'Niro', 'EV6'],
        'Lamborghini': ['Huracán', 'Aventador', 'Urus', 'Revuelto'],
        'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover Evoque', 'Range Rover Velar', 'Range Rover Sport', 'Range Rover'],
        'Lexus': ['IS', 'ES', 'LS', 'RC', 'LC', 'UX', 'NX', 'RZ', 'RX', 'GX', 'LX', 'TX'],
        'Lincoln': ['Corsair', 'Nautilus', 'Aviator', 'Navigator'],
        'Lotus': ['Emira', 'Evora', 'Eletre'],
        'Maserati': ['Ghibli', 'Quattroporte', 'Levante', 'MC20', 'Grecale'],
        'Mazda': ['Mazda3', 'CX-30', 'CX-5', 'CX-50', 'CX-9', 'CX-90', 'MX-5 Miata', 'MX-30'],
        'McLaren': ['570S', '720S', '765LT', 'Artura', 'GT'],
        'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'EQB', 'EQE', 'EQS', 'AMG GT'],
        'Mini': ['Hardtop', 'Convertible', 'Clubman', 'Countryman'],
        'Mitsubishi': ['Mirage', 'Eclipse Cross', 'Outlander', 'Outlander Sport', 'Outlander PHEV'],
        'Nissan': ['Versa', 'Sentra', 'Altima', 'Maxima', 'GT-R', 'Kicks', 'Rogue Sport', 'Rogue', 'Murano', 'Pathfinder', 'Armada', 'Frontier', 'Titan', 'Leaf', 'Ariya', 'Z'],
        'Polestar': ['Polestar 1', 'Polestar 2', 'Polestar 3'],
        'Porsche': ['718 Cayman', '718 Boxster', '911', 'Panamera', 'Taycan', 'Macan', 'Cayenne'],
        'Ram': ['1500', '2500', '3500', 'ProMaster', 'ProMaster City'],
        'Rivian': ['R1T', 'R1S'],
        'Rolls-Royce': ['Ghost', 'Wraith', 'Dawn', 'Phantom', 'Cullinan', 'Spectre'],
        'Subaru': ['Impreza', 'Legacy', 'WRX', 'BRZ', 'Crosstrek', 'Forester', 'Outback', 'Ascent', 'Solterra'],
        'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
        'Toyota': ['Corolla', 'Corolla Hybrid', 'Corolla Cross', 'Prius', 'Camry', 'Camry Hybrid', 'Avalon', 'Avalon Hybrid', 'Crown', 'Mirai', 'GR86', 'Supra', 'C-HR', 'RAV4', 'RAV4 Hybrid', 'RAV4 Prime', 'Venza', 'Highlander', 'Highlander Hybrid', '4Runner', 'Sequoia', 'Land Cruiser', 'Sienna', 'Tacoma', 'Tundra', 'bZ4X'],
        'Volkswagen': ['Jetta', 'Passat', 'Arteon', 'Golf GTI', 'Golf R', 'Tiguan', 'Taos', 'Atlas', 'Atlas Cross Sport', 'ID.4'],
        'Volvo': ['S60', 'S90', 'V60', 'V90', 'XC40', 'C40', 'XC60', 'XC90']
    },

    // State management
    state: {
        currentSearch: null,
        isSearching: false,
        cache: new Map()
    },

    // Initialize search module
    init() {
        console.log('Search module initialized');
        this.setupAutocomplete();
        this.setupFormValidation();
        this.loadCachedSearches();
    },

    // Set up autocomplete functionality
    setupAutocomplete() {
        const makeInput = document.getElementById('make');
        const modelInput = document.getElementById('model');
        
        // Could implement autocomplete dropdowns here
        // For now, using select elements
    },

    // Set up form validation
    setupFormValidation() {
        const inputs = ['year', 'make', 'model', 'zipcode'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('blur', () => this.validateField(id));
            }
        });
    },

    // Validate individual field
    validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const value = field.value;
        let isValid = true;
        let errorMessage = '';

        switch(fieldId) {
            case 'year':
                if (value && !Utils.isValidYear(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid year';
                }
                break;
            case 'zipcode':
                if (value && !Utils.isValidZipCode(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 5-digit ZIP code';
                }
                break;
        }

        this.updateFieldValidation(field, isValid, errorMessage);
        return isValid;
    },

    // Update field validation UI
    updateFieldValidation(field, isValid, errorMessage) {
        const wrapper = field.closest('.input-group');
        const existingError = wrapper.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }

        if (!isValid) {
            field.classList.add('error');
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = errorMessage;
            wrapper.appendChild(error);
        } else {
            field.classList.remove('error');
        }
    },

    // Enable/disable form fields
    enableMakeSelection() {
        const makeSelect = document.getElementById('make');
        makeSelect.disabled = false;
        makeSelect.focus();
    },

    disableMakeSelection() {
        const makeSelect = document.getElementById('make');
        makeSelect.disabled = true;
        makeSelect.value = '';
        this.disableModelSelection();
    },

    enableModelSelection() {
        const modelSelect = document.getElementById('model');
        modelSelect.disabled = false;
        modelSelect.focus();
    },

    disableModelSelection() {
        const modelSelect = document.getElementById('model');
        modelSelect.disabled = true;
        modelSelect.value = '';
    },

    // Populate make dropdown
    populateMakes(year) {
        const makeSelect = document.getElementById('make');
        makeSelect.innerHTML = '<option value="">Select Make</option>';
        
        // In production, filter makes by year availability
        const makes = Object.keys(this.vehicleDatabase).sort();
        
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeSelect.appendChild(option);
        });

        // Add option group for popular makes
        const popularMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
        if (makes.length > 20) {
            const optgroupPopular = document.createElement('optgroup');
            optgroupPopular.label = 'Popular Makes';
            
            popularMakes.forEach(make => {
                if (makes.includes(make)) {
                    const option = document.createElement('option');
                    option.value = make;
                    option.textContent = make;
                    optgroupPopular.appendChild(option);
                }
            });
            
            makeSelect.insertBefore(optgroupPopular, makeSelect.children[1]);
        }
    },

    // Populate model dropdown
    populateModels(make) {
        const modelSelect = document.getElementById('model');
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        const models = this.vehicleDatabase[make] || [];
        models.sort().forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });

        // Show submodel suggestions if available
        this.updateSubmodelSuggestions(make);
    },

    // Update submodel suggestions
    updateSubmodelSuggestions(make) {
        const submodelInput = document.getElementById('submodel');
        const suggestions = this.getCommonSubmodels(make);
        
        if (suggestions.length > 0) {
            submodelInput.placeholder = `e.g., ${suggestions.slice(0, 3).join(', ')}`;
        } else {
            submodelInput.placeholder = 'e.g., Sport, Limited';
        }
    },

    // Get common submodels for a make
    getCommonSubmodels(make) {
        const commonSubmodels = {
            'Toyota': ['LE', 'SE', 'XLE', 'XSE', 'Limited', 'TRD'],
            'Honda': ['LX', 'Sport', 'EX', 'EX-L', 'Touring'],
            'Ford': ['S', 'SE', 'SEL', 'Titanium', 'ST', 'Platinum'],
            'Chevrolet': ['LS', 'LT', 'RS', 'Premier', 'High Country'],
            'BMW': ['Base', 'xDrive', 'M Sport', 'M Performance'],
            'Mercedes-Benz': ['Base', '4MATIC', 'AMG Line', 'AMG']
        };
        
        return commonSubmodels[make] || [];
    },

    // Get current form data
    getVehicleData() {
        return {
            year: document.getElementById('year').value,
            make: document.getElementById('make').value,
            model: document.getElementById('model').value,
            submodel: document.getElementById('submodel').value.trim(),
            zipcode: document.getElementById('zipcode').value
        };
    },

    // Check cache for results
    getCachedResults(vehicleInfo) {
        const cacheKey = `${vehicleInfo.year}-${vehicleInfo.make}-${vehicleInfo.model}`;
        const cached = this.state.cache.get(cacheKey);
        
        if (cached) {
            // Check if cache is still fresh (1 hour)
            const age = Date.now() - cached.timestamp;
            if (age < 3600000) {
                return cached.data;
            } else {
                this.state.cache.delete(cacheKey);
            }
        }
        
        return null;
    },

    // Cache results
    cacheResults(vehicleInfo, data) {
        const cacheKey = `${vehicleInfo.year}-${vehicleInfo.make}-${vehicleInfo.model}`;
        this.state.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });
        
        // Limit cache size
        if (this.state.cache.size > 20) {
            const firstKey = this.state.cache.keys().next().value;
            this.state.cache.delete(firstKey);
        }
    },

    // Load cached searches from localStorage
    loadCachedSearches() {
        try {
            const cached = localStorage.getItem('brakeBiasCachedSearches');
            if (cached) {
                const searches = JSON.parse(cached);
                searches.forEach(search => {
                    this.state.cache.set(search.key, search.value);
                });
            }
        } catch (error) {
            console.error('Error loading cached searches:', error);
        }
    },

    // Save cache to localStorage
    saveCacheToStorage() {
        try {
            const searches = Array.from(this.state.cache.entries()).map(([key, value]) => ({
                key,
                value
            }));
            localStorage.setItem('brakeBiasCachedSearches', JSON.stringify(searches.slice(-10)));
        } catch (error) {
            console.error('Error saving cache:', error);
        }
    },

    // Display search results
    displayResults(data) {
        const resultsSection = document.getElementById('results');
        const vehicleName = this.formatVehicleName(data.vehicleInfo);
        
        // Store current search
        this.state.currentSearch = data;
        
        // Generate and insert HTML
        resultsSection.innerHTML = this.generateResultsHTML(vehicleName, data);
        resultsSection.style.display = 'block';
        
        // Cache results
        this.cacheResults(data.vehicleInfo, data);
        this.saveCacheToStorage();
        
        // Add animations and interactions
        this.animateResults();
        this.setupResultInteractions();
        
        // Update page title
        document.title = `${vehicleName} Reviews - Brake Bias`;
    },

    // Format vehicle name
    formatVehicleName(vehicleInfo) {
        const parts = [
            vehicleInfo.year,
            vehicleInfo.make,
            vehicleInfo.model,
            vehicleInfo.submodel
        ].filter(Boolean);
        
        return parts.join(' ');
    },

    // Generate complete results HTML
    generateResultsHTML(vehicleName, data) {
        return `
            <!-- Vehicle Header -->
            <div class="vehicle-header fade-in">
                <div class="vehicle-header-content">
                    <div class="vehicle-title-section">
                        <h1 class="vehicle-title">${vehicleName}</h1>
                        <div class="vehicle-subtitle">
                            ${data.specs ? `${data.specs.drivetrain} • ${data.specs.engineOptions.length} Engine Options` : ''}
                        </div>
                    </div>
                    <div class="vehicle-actions">
                        <button class="icon-button share-button" title="Share" aria-label="Share results">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="18" cy="12" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="12" cy="6" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                        <button class="icon-button save-search-button" title="Save Search" aria-label="Save search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </button>
                        <button class="icon-button print-button" title="Print" aria-label="Print results">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                        </button>
                    </div>
                </div>
                ${this.generateImageGalleryHTML(data.images, vehicleName)}
            </div>

            <!-- Quick Stats -->
            ${this.generateQuickStats(data)}

            <!-- Navigation Tabs -->
            <div class="results-navigation fade-in">
                <button class="nav-tab active" data-section="overview">Overview</button>
                <button class="nav-tab" data-section="specs">Specifications</button>
                <button class="nav-tab" data-section="reviews">Reviews</button>
                <button class="nav-tab" data-section="pricing">Pricing</button>
                <button class="nav-tab" data-section="market">Find One</button>
            </div>

            <!-- Content Sections -->
            <div class="results-content">
                <!-- Overview Section -->
                <div id="overview-section" class="content-section active">
                    ${this.generateOverviewSection(data)}
                </div>

                <!-- Specifications Section -->
                <div id="specs-section" class="content-section">
                    ${this.generateSpecsSection(data.specs)}
                </div>

                <!-- Reviews Section -->
                <div id="reviews-section" class="content-section">
                    ${this.generateReviewsSection(data.reviews, data.reddit)}
                </div>

                <!-- Pricing Section -->
                <div id="pricing-section" class="content-section">
                    ${this.generatePricingSection(data.pricing, data.vehicleInfo.zipcode)}
                </div>

                <!-- Market Section -->
                <div id="market-section" class="content-section">
                    ${this.generateMarketSection(data.vehicleInfo, data.pricing)}
                </div>
            </div>
        `;
    },

    // Generate image gallery HTML
    generateImageGalleryHTML(images, vehicleName) {
        if (!images || images.length === 0) {
            return `
                <div class="no-images-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p>No images available</p>
                </div>
            `;
        }

        return `
            <div class="vehicle-images">
                <div class="main-image-container">
                    <img src="${images[0]}" 
                         alt="${vehicleName}" 
                         class="main-vehicle-image"
                         id="mainImage">
                    <div class="image-navigation">
                        <button class="image-nav-btn prev" onclick="Search.navigateImage(-1)">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="image-nav-btn next" onclick="Search.navigateImage(1)">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
                ${images.length > 1 ? `
                    <div class="image-thumbnails">
                        ${images.map((img, index) => `
                            <img src="${img}" 
                                 alt="${vehicleName} - View ${index + 1}" 
                                 class="thumbnail ${index === 0 ? 'active' : ''}"
                                 onclick="Search.selectImage(${index})"
                                 data-index="${index}">
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Image gallery navigation
    currentImageIndex: 0,
    
    selectImage(index) {
        const images = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('mainImage');
        
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        
        mainImage.src = images[index].src;
        this.currentImageIndex = index;
    },

    navigateImage(direction) {
        const images = document.querySelectorAll('.thumbnail');
        const newIndex = (this.currentImageIndex + direction + images.length) % images.length;
        this.selectImage(newIndex);
    },

    // Generate quick stats
    generateQuickStats(data) {
        const stats = this.calculateStats(data);
        
        return `
            <div class="quick-stats fade-in">
                <div class="stat-item">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-content">
                        <div class="stat-value">${stats.avgRating}</div>
                        <div class="stat-label">Average Rating</div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">💰</div>
                    <div class="stat-content">
                        <div class="stat-value">${stats.avgPrice}</div>
                        <div class="stat-label">Average Price</div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">⛽</div>
                    <div class="stat-content">
                        <div class="stat-value">${stats.mpg}</div>
                        <div class="stat-label">City/Highway MPG</div>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">💬</div>
                    <div class="stat-content">
                        <div class="stat-value">${stats.totalReviews}</div>
                        <div class="stat-label">Total Reviews</div>
                    </div>
                </div>
            </div>
        `;
    },

    // Calculate statistics
    calculateStats(data) {
        const avgRating = data.reviews && data.reviews.length > 0
            ? (data.reviews.reduce((sum, r) => sum + r.rating, 0) / data.reviews.length).toFixed(1)
            : 'N/A';
            
        const avgPrice = data.pricing && data.pricing.usedMarket
            ? Utils.formatCurrency(data.pricing.usedMarket.average || data.pricing.msrp.average)
            : 'N/A';
            
        const mpg = data.specs && data.specs.mpg
            ? `${data.specs.mpg.city}/${data.specs.mpg.highway}`
            : 'N/A';
            
        const totalReviews = (data.reviews ? data.reviews.length : 0) + 
                           (data.reddit && data.reddit.totalPosts ? 1 : 0);
        
        return { avgRating, avgPrice, mpg, totalReviews };
    },

    // Generate overview section
    generateOverviewSection(data) {
        const pros = this.aggregatePros(data.reviews);
        const cons = this.aggregateCons(data.reviews);
        
        return `
            <div class="overview-grid">
                <!-- At a Glance -->
                <div class="info-card overview-card fade-in">
                    <h3>At a Glance</h3>
                    <div class="overview-summary">
                        ${data.specs ? `
                            <div class="summary-item">
                                <span class="summary-label">Body Style:</span>
                                <span class="summary-value">${this.getBodyStyle(data.vehicleInfo.model)}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Seating:</span>
                                <span class="summary-value">${this.getSeatingCapacity(data.vehicleInfo.model)} passengers</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Drivetrain:</span>
                                <span class="summary-value">${data.specs.drivetrain || 'FWD/AWD Available'}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Fuel Type:</span>
                                <span class="summary-value">${this.getFuelType(data.vehicleInfo.model)}</span>
                            </div>
                        ` : '<p>Specifications not available</p>'}
                    </div>
                </div>

                <!-- Pros & Cons -->
                <div class="info-card overview-card fade-in">
                    <h3>Pros & Cons</h3>
                    <div class="pros-cons-grid">
                        <div class="pros-section">
                            <h4 class="pros-heading">✓ Strengths</h4>
                            <ul class="pros-list">
                                ${pros.map(pro => `<li>${pro}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="cons-section">
                            <h4 class="cons-heading">✗ Weaknesses</h4>
                            <ul class="cons-list">
                                ${cons.map(con => `<li>${con}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Key Features -->
                ${data.specs ? `
                    <div class="info-card overview-card fade-in">
                        <h3>Key Features</h3>
                        <div class="features-grid">
                            ${this.generateKeyFeatures(data.specs)}
                        </div>
                    </div>
                ` : ''}

                <!-- Competition -->
                <div class="info-card overview-card fade-in">
                    <h3>Compare With Competition</h3>
                    <div class="competition-list">
                        ${this.getCompetitors(data.vehicleInfo).map(competitor => `
                            <div class="competitor-item">
                                <span class="competitor-name">${competitor}</span>
                                <button class="compare-btn" onclick="Search.compareVehicle('${competitor}')">
                                    Compare →
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    // Generate specifications section
    generateSpecsSection(specs) {
        if (!specs) {
            return '<div class="info-card fade-in"><p>Specifications not available</p></div>';
        }

        return `
            <div class="specs-container">
                <!-- Engine & Performance -->
                <div class="info-card specs-card fade-in">
                    <h3>Engine & Performance</h3>
                    <div class="specs-grid">
                        ${specs.engineOptions.map((engine, index) => `
                            <div class="engine-option ${index === 0 ? 'primary' : ''}">
                                <h4>${engine.name}</h4>
                                <div class="engine-specs">
                                    <div class="spec-item">
                                        <span class="spec-label">Horsepower</span>
                                        <span class="spec-value">${engine.horsepower} HP</span>
                                    </div>
                                    <div class="spec-item">
                                        <span class="spec-label">Torque</span>
                                        <span class="spec-value">${engine.torque} lb-ft</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                        <div class="spec-item full-width">
                            <span class="spec-label">Transmission</span>
                            <span class="spec-value">${specs.transmission}</span>
                        </div>
                        <div class="spec-item full-width">
                            <span class="spec-label">Drivetrain</span>
                            <span class="spec-value">${specs.drivetrain || 'FWD/AWD Available'}</span>
                        </div>
                    </div>
                </div>

                <!-- Fuel Economy -->
                <div class="info-card specs-card fade-in">
                    <h3>Fuel Economy</h3>
                    <div class="fuel-economy-display">
                        <div class="mpg-display">
                            <div class="mpg-item city">
                                <div class="mpg-number">${specs.mpg.city}</div>
                                <div class="mpg-label">City</div>
                            </div>
                            <div class="mpg-item combined">
                                <div class="mpg-number">${specs.mpg.combined || Math.round((specs.mpg.city + specs.mpg.highway) / 2)}</div>
                                <div class="mpg-label">Combined</div>
                            </div>
                            <div class="mpg-item highway">
                                <div class="mpg-number">${specs.mpg.highway}</div>
                                <div class="mpg-label">Highway</div>
                            </div>
                        </div>
                        ${specs.fuelCapacity ? `
                            <div class="fuel-details">
                                <div class="spec-item">
                                    <span class="spec-label">Fuel Tank Capacity</span>
                                    <span class="spec-value">${specs.fuelCapacity} gallons</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Range (estimated)</span>
                                    <span class="spec-value">${Math.round(specs.fuelCapacity * specs.mpg.combined)} miles</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Dimensions -->
                ${specs.dimensions ? `
                    <div class="info-card specs-card fade-in">
                        <h3>Dimensions</h3>
                        <div class="dimensions-grid">
                            <div class="dimension-item">
                                <span class="dimension-icon">↔</span>
                                <span class="dimension-label">Length</span>
                                <span class="dimension-value">${specs.dimensions.length}</span>
                            </div>
                            <div class="dimension-item">
                                <span class="dimension-icon">↕</span>
                                <span class="dimension-label">Width</span>
                                <span class="dimension-value">${specs.dimensions.width}</span>
                            </div>
                            <div class="dimension-item">
                                <span class="dimension-icon">📏</span>
                                <span class="dimension-label">Height</span>
                                <span class="dimension-value">${specs.dimensions.height}</span>
                            </div>
                            <div class="dimension-item">
                                <span class="dimension-icon">⚙</span>
                                <span class="dimension-label">Wheelbase</span>
                                <span class="dimension-value">${specs.dimensions.wheelbase}</span>
                            </div>
                            ${specs.dimensions.groundClearance ? `
                                <div class="dimension-item">
                                    <span class="dimension-icon">🚗</span>
                                    <span class="dimension-label">Ground Clearance</span>
                                    <span class="dimension-value">${specs.dimensions.groundClearance}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <!-- Weight -->
                ${specs.weight ? `
                    <div class="info-card specs-card fade-in">
                        <h3>Weight</h3>
                        <div class="specs-grid">
                            <div class="spec-item">
                                <span class="spec-label">Curb Weight</span>
                                <span class="spec-value">${specs.weight.curb}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Gross Weight</span>
                                <span class="spec-value">${specs.weight.gross}</span>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Available Colors -->
                <div class="info-card specs-card fade-in">
                    <h3>Available Colors</h3>
                    <div class="colors-section">
                        <div class="color-category">
                            <h4>Exterior Colors (${specs.colors.exterior.length})</h4>
                            <div class="color-chips">
                                ${specs.colors.exterior.map(color => `
                                    <div class="color-chip" title="${color}">
                                        <div class="color-swatch" style="background-color: ${this.getColorHex(color)}"></div>
                                        <span class="color-name">${color}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="color-category">
                            <h4>Interior Colors (${specs.colors.interior.length})</h4>
                            <div class="color-chips">
                                ${specs.colors.interior.map(color => `
                                    <div class="color-chip" title="${color}">
                                        <div class="color-swatch" style="background-color: ${this.getColorHex(color)}"></div>
                                        <span class="color-name">${color}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Safety Features -->
                ${specs.safety ? `
                    <div class="info-card specs-card fade-in">
                        <h3>Safety</h3>
                        <div class="safety-content">
                            <div class="safety-rating">
                                <span class="rating-label">Safety Rating</span>
                                <div class="star-rating">
                                    ${this.generateStars(specs.safety.rating)}
                                </div>
                            </div>
                            <div class="safety-features">
                                <h4>Standard Safety Features</h4>
                                <ul class="feature-list">
                                    ${specs.safety.features.map(feature => `
                                        <li>${feature}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Available Trims -->
                ${specs.submodels && specs.submodels.length > 0 ? `
                    <div class="info-card specs-card fade-in">
                        <h3>Available Trims</h3>
                        <div class="trims-grid">
                            ${specs.submodels.map(trim => `
                                <div class="trim-item">
                                    <span class="trim-name">${trim}</span>
                                    <button class="trim-details-btn" onclick="Search.showTrimDetails('${trim}')">
                                        View Details
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Generate reviews section
    generateReviewsSection(reviews, reddit) {
        return `
            <div class="reviews-container">
                <!-- Professional Reviews -->
                <div class="info-card reviews-card fade-in">
                    <h3>Professional Reviews</h3>
                    ${reviews && reviews.length > 0 ? `
                        <div class="reviews-list">
                            ${reviews.map((review, index) => `
                                <div class="review-item ${index === 0 ? 'expanded' : ''}" data-review-index="${index}">
                                    <div class="review-header" onclick="Search.toggleReview(${index})">
                                        <div class="review-source-info">
                                            <img src="${this.getSourceLogo(review.source)}" alt="${review.source}" class="source-logo">
                                            <div>
                                                <div class="review-source">${review.source}</div>
                                                <div class="review-rating">${this.generateStars(review.rating)}</div>
                                            </div>
                                        </div>
                                        <div class="review-expand-icon">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="review-content">
                                        <div class="review-snippet">"${review.snippet}"</div>
                                        <div class="review-details">
                                            <div class="pros-cons-grid">
                                                <div class="review-pros">
                                                    <h5>Pros</h5>
                                                    <ul>
                                                        ${review.pros.map(pro => `<li>${pro}</li>`).join('')}
                                                    </ul>
                                                </div>
                                                <div class="review-cons">
                                                    <h5>Cons</h5>
                                                    <ul>
                                                        ${review.cons.map(con => `<li>${con}</li>`).join('')}
                                                    </ul>
                                                </div>
                                            </div>
                                            ${review.verdict ? `
                                                <div class="review-verdict">
                                                    <strong>Verdict:</strong> ${review.verdict}
                                                </div>
                                            ` : ''}
                                            <a href="${review.url}" target="_blank" rel="noopener" class="read-full-review">
                                                Read Full Review
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Review Summary -->
                        <div class="review-summary">
                            <h4>Professional Consensus</h4>
                            <div class="consensus-content">
                                ${this.generateReviewConsensus(reviews)}
                            </div>
                        </div>
                    ` : '<p>No professional reviews available</p>'}
                </div>

                <!-- Owner Reviews -->
                ${reddit ? `
                    <div class="info-card reviews-card fade-in">
                        <h3>Owner Reviews & Discussions</h3>
                        <div class="reddit-analysis">
                            <div class="analysis-header">
                                <div class="analysis-stats">
                                    <span class="stat-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        ${reddit.totalPosts} discussions analyzed
                                    </span>
                                    <span class="stat-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                        From ${reddit.subreddits.join(', ')}
                                    </span>
                                </div>
                            </div>

                            <!-- Sentiment Analysis -->
                            <div class="sentiment-analysis">
                                <h4>Owner Sentiment Analysis</h4>
                                <div class="sentiment-chart">
                                    ${this.generateSentimentChart(reddit.sentiment)}
                                </div>
                                <div class="sentiment-breakdown">
                                    <div class="sentiment-category positive">
                                        <h5>What Owners Love</h5>
                                        <div class="sentiment-tags">
                                            ${reddit.sentiment.positive.map(item => `
                                                <span class="sentiment-tag">${item}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <div class="sentiment-category neutral">
                                        <h5>Mixed Opinions</h5>
                                        <div class="sentiment-tags">
                                            ${reddit.sentiment.neutral.map(item => `
                                                <span class="sentiment-tag">${item}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <div class="sentiment-category negative">
                                        <h5>Common Complaints</h5>
                                        <div class="sentiment-tags">
                                            ${reddit.sentiment.negative.map(item => `
                                                <span class="sentiment-tag">${item}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Popular Topics -->
                            <div class="popular-topics">
                                <h4>Most Discussed Topics</h4>
                                <div class="topics-list">
                                    ${reddit.commonTopics.map((topic, index) => `
                                        <div class="topic-item">
                                            <span class="topic-rank">${index + 1}</span>
                                            <span class="topic-text">${topic}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Sample Comments -->
                            ${reddit.sampleComments && reddit.sampleComments.length > 0 ? `
                                <div class="sample-comments">
                                    <h4>What Real Owners Are Saying</h4>
                                    <div class="comments-list">
                                        ${reddit.sampleComments.map(comment => `
                                            <div class="comment-item">
                                                <div class="comment-header">
                                                    <span class="comment-author">${comment.author}</span>
                                                    <span class="comment-votes">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                            <polyline points="18 15 12 9 6 15"></polyline>
                                                        </svg>
                                                        ${comment.upvotes}
                                                    </span>
                                                </div>
                                                <div class="comment-text">"${comment.comment}"</div>
                                            </div>
                                        `).join('')}
                                    </div>
                                    <a href="https://www.reddit.com/search/?q=${encodeURIComponent(reddit.subreddits[0] + ' ' + this.state.currentSearch.vehicleInfo.make + ' ' + this.state.currentSearch.vehicleInfo.model)}" 
                                       target="_blank" 
                                       rel="noopener"
                                       class="view-discussions-link">
                                        View All Discussions on Reddit
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </a>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // Generate pricing section
    generatePricingSection(pricing, zipcode) {
        if (!pricing) {
            return '<div class="info-card fade-in"><p>Pricing information not available</p></div>';
        }

        const hasLocalData = pricing.localData && zipcode;

        return `
            <div class="pricing-container">
                <!-- Price Overview -->
                <div class="info-card pricing-card fade-in">
                    <h3>Price Overview</h3>
                    <div class="price-overview">
                        <div class="price-chart">
                            <canvas id="priceChart" width="400" height="200"></canvas>
                        </div>
                        <div class="price-summary">
                            <div class="price-range-display">
                                <div class="price-category">
                                    <h4>New (MSRP)</h4>
                                    <div class="price-range">
                                        <span class="price-min">${Utils.formatCurrency(pricing.msrp.min)}</span>
                                        <span class="price-dash">—</span>
                                        <span class="price-max">${Utils.formatCurrency(pricing.msrp.max)}</span>
                                    </div>
                                    <div class="price-avg">Average: ${Utils.formatCurrency(pricing.msrp.average)}</div>
                                </div>
                                <div class="price-category">
                                    <h4>Used Market</h4>
                                    <div class="price-range">
                                        <span class="price-min">${Utils.formatCurrency(pricing.usedMarket.min)}</span>
                                        <span class="price-dash">—</span>
                                        <span class="price-max">${Utils.formatCurrency(pricing.usedMarket.max)}</span>
                                    </div>
                                    <div class="price-avg">Average: ${Utils.formatCurrency(pricing.usedMarket.average)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Local Market Data -->
                ${hasLocalData ? `
                    <div class="info-card pricing-card fade-in">
                        <h3>Local Market Analysis (${zipcode})</h3>
                        <div class="local-market-grid">
                            <div class="market-stat">
                                <div class="stat-icon">📍</div>
                                <div class="stat-content">
                                    <div class="stat-value">${pricing.localData.listings}</div>
                                    <div class="stat-label">Available Listings</div>
                                    <div class="stat-detail">Within ${pricing.localData.radius}</div>
                                </div>
                            </div>
                            <div class="market-stat">
                                <div class="stat-icon">💵</div>
                                <div class="stat-content">
                                    <div class="stat-value">${Utils.formatCurrency(pricing.localData.averagePrice)}</div>
                                    <div class="stat-label">Local Average Price</div>
                                    <div class="stat-detail trend-${pricing.localData.marketTrend}">
                                        Market is ${pricing.localData.marketTrend}
                                    </div>
                                </div>
                            </div>
                            <div class="market-stat">
                                <div class="stat-icon">📅</div>
                                <div class="stat-content">
                                    <div class="stat-value">${pricing.localData.daysOnMarket}</div>
                                    <div class="stat-label">Avg Days on Market</div>
                                    <div class="stat-detail">In your area</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="info-card pricing-card fade-in">
                        <div class="no-local-data">
                            <p>Enter your ZIP code to see local market data</p>
                            <button class="update-location-btn" onclick="Search.promptForZipCode()">
                                Add ZIP Code
                            </button>
                        </div>
                    </div>
                `}

                <!-- Depreciation -->
                ${pricing.depreciation ? `
                    <div class="info-card pricing-card fade-in">
                        <h3>Expected Depreciation</h3>
                        <div class="depreciation-chart">
                            <div class="depreciation-timeline">
                                ${Object.entries(pricing.depreciation).map(([year, percentage]) => `
                                    <div class="depreciation-point">
                                        <div class="depreciation-bar" style="height: ${percentage.replace('%', '')}%">
                                            <span class="depreciation-value">${percentage}</span>
                                        </div>
                                        <div class="depreciation-label">${year.replace('year', 'Year ')}</div>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="depreciation-info">
                                <p>Based on historical data for similar vehicles in this class.</p>
                                <p>Actual depreciation may vary based on condition, mileage, and market factors.</p>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Cost of Ownership -->
                <div class="info-card pricing-card fade-in">
                    <h3>Estimated Cost of Ownership</h3>
                    <div class="ownership-costs">
                        ${this.generateOwnershipCosts(pricing, this.state.currentSearch.specs)}
                    </div>
                </div>
            </div>
        `;
    },

    // Generate market section
    generateMarketSection(vehicleInfo, pricing) {
        const autoTempestUrl = this.buildAutoTempestUrl(vehicleInfo);
        const hasZip = vehicleInfo.zipcode && vehicleInfo.zipcode.length === 5;

        return `
            <div class="market-container">
                <!-- Market Overview -->
                <div class="info-card market-card fade-in">
                    <h3>Find Your ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}</h3>
                    <div class="market-overview">
                        <p>Ready to buy? We've partnered with AutoTempest to help you find the best deals in your area.</p>
                        
                        <div class="market-stats">
                            ${pricing && pricing.localData ? `
                                <div class="market-stat-item">
                                    <strong>${pricing.localData.listings}</strong> vehicles available near you
                                </div>
                                <div class="market-stat-item">
                                    Average price: <strong>${Utils.formatCurrency(pricing.localData.averagePrice)}</strong>
                                </div>
                                <div class="market-stat-item">
                                    Typically sells in <strong>${pricing.localData.daysOnMarket} days</strong>
                                </div>
                            ` : `
                                <p>National inventory and pricing data available on AutoTempest</p>
                            `}
                        </div>

                        <div class="market-actions">
                            <a href="${autoTempestUrl}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="primary-action-button">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="9" y1="9" x2="15" y2="9"></line>
                                    <line x1="9" y1="13" x2="15" y2="13"></line>
                                    <line x1="9" y1="17" x2="11" y2="17"></line>
                                </svg>
                                Browse Available Inventory
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </a>
                        </div>

                        ${hasZip ? `
                            <div class="search-location">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                Searching within 50 miles of ${vehicleInfo.zipcode}
                                <button class="change-location-btn" onclick="Search.changeLocation()">Change</button>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Buying Tips -->
                <div class="info-card market-card fade-in">
                    <h3>Buying Tips for This Model</h3>
                    <div class="tips-content">
                        ${this.generateBuyingTips(vehicleInfo, pricing)}
                    </div>
                </div>

                <!-- Alternative Search Options -->
                <div class="info-card market-card fade-in">
                    <h3>Other Search Options</h3>
                    <div class="alternative-searches">
                        <a href="${this.buildAutoTempestUrl({...vehicleInfo, year: parseInt(vehicleInfo.year) - 1})}" 
                           target="_blank" 
                           rel="noopener"
                           class="alt-search-link">
                            Search ${parseInt(vehicleInfo.year) - 1} Models
                        </a>
                        <a href="${this.buildAutoTempestUrl({...vehicleInfo, year: parseInt(vehicleInfo.year) + 1})}" 
                           target="_blank" 
                           rel="noopener"
                           class="alt-search-link">
                            Search ${parseInt(vehicleInfo.year) + 1} Models
                        </a>
                        <a href="${this.buildAutoTempestUrl({...vehicleInfo, year: ''})}" 
                           target="_blank" 
                           rel="noopener"
                           class="alt-search-link">
                            Search All Years
                        </a>
                    </div>
                </div>

                <!-- Save Search Alert -->
                <div class="info-card market-card fade-in">
                    <h3>Get Notified</h3>
                    <div class="alert-signup">
                        <p>Want to be notified when prices drop or new inventory arrives?</p>
                        <form class="alert-form" onsubmit="Search.setupAlert(event)">
                            <input type="email" 
                                   placeholder="Enter your email" 
                                   class="alert-email-input"
                                   required>
                            <button type="submit" class="alert-submit-btn">
                                Set Up Alert
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    // Helper methods
    getBodyStyle(model) {
        const sedans = ['Camry', 'Accord', 'Civic', 'Corolla', '3 Series', 'A4', 'C-Class'];
        const suvs = ['RAV4', 'CR-V', 'X5', 'Q5', 'GLE', 'Highlander', 'Pilot'];
        const trucks = ['F-150', 'Silverado', 'Ram 1500', 'Tacoma', 'Ranger'];
        
        if (sedans.some(s => model.includes(s))) return 'Sedan';
        if (suvs.some(s => model.includes(s))) return 'SUV';
        if (trucks.some(t => model.includes(t))) return 'Truck';
        return 'Vehicle';
    },

    getSeatingCapacity(model) {
        const sevenSeaters = ['Highlander', 'Pilot', 'Explorer', 'Tahoe', 'Traverse'];
        const twoSeaters = ['Corvette', 'Miata', 'Z4', '718', '911'];
        
        if (sevenSeaters.some(s => model.includes(s))) return '7';
        if (twoSeaters.some(t => model.includes(t))) return '2';
        return '5';
    },

    getFuelType(model) {
        const electric = ['Model 3', 'Model Y', 'Bolt', 'Leaf', 'ID.4', 'Mach-E'];
        const hybrid = ['Prius', 'Insight', 'Accord Hybrid', 'Camry Hybrid'];
        
        if (electric.some(e => model.includes(e))) return 'Electric';
        if (hybrid.some(h => model.includes(h))) return 'Hybrid';
        return 'Gasoline';
    },

    getCompetitors(vehicleInfo) {
        const competitorMap = {
            'Camry': ['Honda Accord', 'Nissan Altima', 'Mazda6'],
            'Accord': ['Toyota Camry', 'Nissan Altima', 'Mazda6'],
            'Civic': ['Toyota Corolla', 'Mazda3', 'Nissan Sentra'],
            'Corolla': ['Honda Civic', 'Mazda3', 'Nissan Sentra'],
            'RAV4': ['Honda CR-V', 'Mazda CX-5', 'Nissan Rogue'],
            'CR-V': ['Toyota RAV4', 'Mazda CX-5', 'Nissan Rogue'],
            'F-150': ['Chevrolet Silverado', 'Ram 1500', 'GMC Sierra'],
            'Silverado': ['Ford F-150', 'Ram 1500', 'GMC Sierra']
        };
        
        return competitorMap[vehicleInfo.model] || ['Similar vehicles in class'];
    },

    aggregatePros(reviews) {
        if (!reviews || reviews.length === 0) return ['Information not available'];
        
        const allPros = reviews.flatMap(r => r.pros);
        const proCounts = {};
        
        allPros.forEach(pro => {
            proCounts[pro] = (proCounts[pro] || 0) + 1;
        });
        
        return Object.entries(proCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([pro]) => pro);
    },

    aggregateCons(reviews) {
        if (!reviews || reviews.length === 0) return ['Information not available'];
        
        const allCons = reviews.flatMap(r => r.cons);
        const conCounts = {};
        
        allCons.forEach(con => {
            conCounts[con] = (conCounts[con] || 0) + 1;
        });
        
        return Object.entries(conCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([con]) => con);
    },

    generateKeyFeatures(specs) {
        const features = [];
        
        if (specs.safety && specs.safety.features) {
            features.push(...specs.safety.features.slice(0, 3).map(f => ({
                icon: '🛡️',
                text: f
            })));
        }
        
        if (specs.mpg) {
            features.push({
                icon: '⛽',
                text: `${specs.mpg.combined || Math.round((specs.mpg.city + specs.mpg.highway) / 2)} MPG Combined`
            });
        }
        
        if (specs.engineOptions && specs.engineOptions.length > 1) {
            features.push({
                icon: '🔧',
                text: `${specs.engineOptions.length} Engine Options`
            });
        }
        
        return features.map(feature => `
            <div class="feature-item">
                <span class="feature-icon">${feature.icon}</span>
                <span class="feature-text">${feature.text}</span>
            </div>
        `).join('');
    },

    getColorHex(colorName) {
        const colorMap = {
            'Pearl White': '#F8F8FF',
            'Midnight Black': '#000000',
            'Silver Metallic': '#C0C0C0',
            'Blue Crush': '#0066CC',
            'Ruby Red': '#9B111E',
            'Celestial Silver': '#E5E4E2',
            'Wind Chill Pearl': '#F0F8FF',
            'Black': '#000000',
            'Ash': '#B2BEB5',
            'Cockpit Red': '#8B0000'
        };
        
        return colorMap[colorName] || '#CCCCCC';
    },

    getSourceLogo(source) {
        // In production, these would be actual logo URLs
        const logos = {
            'MotorTrend': '/assets/logos/motortrend.png',
            'Car and Driver': '/assets/logos/caranddriver.png',
            'Edmunds': '/assets/logos/edmunds.png'
        };
        
        return logos[source] || '/assets/logos/default.png';
    },

    toggleReview(index) {
        const reviewItem = document.querySelector(`[data-review-index="${index}"]`);
        const allReviews = document.querySelectorAll('.review-item');
        
        allReviews.forEach((review, i) => {
            if (i !== index) {
                review.classList.remove('expanded');
            }
        });
        
        reviewItem.classList.toggle('expanded');
    },

    generateReviewConsensus(reviews) {
        const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
        const allPros = [...new Set(reviews.flatMap(r => r.pros))];
        const allCons = [...new Set(reviews.flatMap(r => r.cons))];
        
        return `
            <div class="consensus-rating">
                <span class="consensus-score">${avgRating}</span>
                <span class="consensus-label">Average Professional Rating</span>
            </div>
            <div class="consensus-summary">
                <p><strong>Strengths:</strong> ${allPros.slice(0, 3).join(', ')}</p>
                <p><strong>Weaknesses:</strong> ${allCons.slice(0, 3).join(', ')}</p>
            </div>
        `;
    },

    generateSentimentChart(sentiment) {
        const total = sentiment.positive.length + sentiment.neutral.length + sentiment.negative.length;
        const positivePercent = (sentiment.positive.length / total * 100).toFixed(0);
        const neutralPercent = (sentiment.neutral.length / total * 100).toFixed(0);
        const negativePercent = (sentiment.negative.length / total * 100).toFixed(0);
        
        return `
            <div class="sentiment-bar">
                <div class="sentiment-segment positive" style="width: ${positivePercent}%">
                    ${positivePercent}%
                </div>
                <div class="sentiment-segment neutral" style="width: ${neutralPercent}%">
                    ${neutralPercent}%
                </div>
                <div class="sentiment-segment negative" style="width: ${negativePercent}%">
                    ${negativePercent}%
                </div>
            </div>
        `;
    },

    generateOwnershipCosts(pricing, specs) {
        // Estimate annual costs
        const fuelCost = specs && specs.mpg ? 
            Math.round(12000 / ((specs.mpg.city + specs.mpg.highway) / 2) * 3.50) : 1500;
        const insurance = Math.round(pricing.msrp.average * 0.015);
        const maintenance = 500;
        const registration = 150;
        
        return `
            <div class="ownership-breakdown">
                <div class="cost-item">
                    <span class="cost-label">Fuel (12k miles/year)</span>
                    <span class="cost-value">${Utils.formatCurrency(fuelCost)}/year</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Insurance (estimated)</span>
                    <span class="cost-value">${Utils.formatCurrency(insurance)}/year</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Maintenance</span>
                    <span class="cost-value">${Utils.formatCurrency(maintenance)}/year</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Registration</span>
                    <span class="cost-value">${Utils.formatCurrency(registration)}/year</span>
                </div>
                <div class="cost-total">
                    <span class="cost-label">Total Annual Cost</span>
                    <span class="cost-value">${Utils.formatCurrency(fuelCost + insurance + maintenance + registration)}/year</span>
                </div>
            </div>
            <p class="cost-disclaimer">*Estimates based on national averages. Actual costs will vary.</p>
        `;
    },

    generateBuyingTips(vehicleInfo, pricing) {
        const tips = [
            'Check service records and vehicle history reports',
            'Have a pre-purchase inspection done by a trusted mechanic',
            'Compare prices across multiple dealers and private sellers',
            'Consider certified pre-owned options for added warranty coverage'
        ];
        
        if (pricing && pricing.localData) {
            tips.push(`Average time on market is ${pricing.localData.daysOnMarket} days - act quickly on good deals`);
        }
        
        return `
            <ul class="tips-list">
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
    },

    buildAutoTempestUrl(vehicleInfo) {
        const params = new URLSearchParams();
        
        if (vehicleInfo.make) params.append('make', vehicleInfo.make);
        if (vehicleInfo.model) params.append('model', vehicleInfo.model);
        if (vehicleInfo.year) {
            params.append('year_from', vehicleInfo.year);
            params.append('year_to', vehicleInfo.year);
        }
        if (vehicleInfo.submodel) params.append('trim', vehicleInfo.submodel);
        if (vehicleInfo.zipcode) {
            params.append('zip', vehicleInfo.zipcode);
            params.append('radius', '50');
        }
        
        return `https://www.autotempest.com/results?${params.toString()}`;
    },

    // Event handlers
    compareVehicle(competitor) {
        // Open comparison in new tab or modal
        console.log('Compare with:', competitor);
        Utils.showAlert('Comparison feature coming soon!', 'info');
    },

    showTrimDetails(trim) {
        console.log('Show details for trim:', trim);
        Utils.showAlert(`${trim} trim details coming soon!`, 'info');
    },

    promptForZipCode() {
        const zipcode = prompt('Enter your ZIP code for local market data:');
        if (zipcode && Utils.isValidZipCode(zipcode)) {
            document.getElementById('zipcode').value = zipcode;
            // Re-run search with ZIP code
            App.handleSearch();
        } else if (zipcode) {
            Utils.showAlert('Please enter a valid 5-digit ZIP code', 'error');
        }
    },

    changeLocation() {
        this.promptForZipCode();
    },

    setupAlert(event) {
        event.preventDefault();
        const email = event.target.querySelector('.alert-email-input').value;
        console.log('Setting up alert for:', email);
        Utils.showAlert('Price alert set up successfully!', 'success');
        event.target.reset();
    },

    // Animation methods
    animateResults() {
        // Add staggered fade-in animations
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 50}ms`;
            el.classList.add('animated');
        });

        // Animate stat numbers
        setTimeout(() => {
            this.animateNumbers();
        }, 300);

        // Initialize any charts
        setTimeout(() => {
            this.initializeCharts();
        }, 500);
    },

    animateNumbers() {
        const numbers = document.querySelectorAll('.stat-value');
        numbers.forEach(num => {
            const finalValue = num.textContent;
            const isPrice = finalValue.includes(');
            const isMPG = finalValue.includes('/');
            
            if (!isPrice && !isMPG && !isNaN(finalValue)) {
                const value = parseInt(finalValue);
                let current = 0;
                const increment = value / 20;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        current = value;
                        clearInterval(timer);
                    }
                    num.textContent = Math.round(current);
                }, 50);
            }
        });
    },

    initializeCharts() {
        // Initialize price comparison chart if canvas exists
        const priceChart = document.getElementById('priceChart');
        if (priceChart && this.state.currentSearch && this.state.currentSearch.pricing) {
            // In production, use Chart.js or similar
            console.log('Initialize price chart');
        }
    },

    setupResultInteractions() {
        // Navigation tabs
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.switchSection(section);
            });
        });

        // Print functionality
        const printBtn = document.querySelector('.print-button');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printResults());
        }

        // Image error handling
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'https://via.placeholder.com/600x400/cccccc/666666?text=Image+Not+Available';
            });
        });

        // Smooth scroll for internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },

    switchSection(sectionName) {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Show selected section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');

        // Scroll to section
        const headerHeight = document.querySelector('.header').offsetHeight;
        const navHeight = document.querySelector('.results-navigation').offsetHeight;
        const scrollPosition = document.querySelector('.results-navigation').offsetTop - headerHeight;
        
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    },

    printResults() {
        window.print();
    },

    // Generate star rating display
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<span class="star full">★</span>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHtml += '<span class="star half">★</span>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<span class="star empty">★</span>';
        }
        
        return `
            <div class="star-rating">
                <div class="stars">${starsHtml}</div>
                <span class="rating-number">${rating}/5</span>
            </div>
        `;
    }
};