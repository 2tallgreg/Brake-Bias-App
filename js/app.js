// Main Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    ThemeManager.init();
    
    // Initialize search functionality
    Search.init();
    
    // Populate year dropdown
    populateYears();
    
    // Set up event listeners
    setupEventListeners();
});

function populateYears() {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear() + 2;
    
    for (let year = currentYear; year >= 1885; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

function setupEventListeners() {
    // Year selection
    document.getElementById('year').addEventListener('change', handleYearChange);
    
    // Make selection
    document.getElementById('make').addEventListener('change', handleMakeChange);
    
    // Search button
    document.getElementById('searchButton').addEventListener('click', handleSearch);
    
    // Enter key on zip code
    document.getElementById('zipcode').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function handleYearChange(e) {
    const year = e.target.value;
    if (year) {
        Search.enableMakeSelection();
        Search.populateMakes(year);
    } else {
        Search.disableMakeSelection();
        Search.disableModelSelection();
    }
}

function handleMakeChange(e) {
    const make = e.target.value;
    if (make) {
        Search.enableModelSelection();
        Search.populateModels(make);
    } else {
        Search.disableModelSelection();
    }
}

async function handleSearch() {
    const vehicleData = Search.getVehicleData();
    
    if (!vehicleData.year || !vehicleData.make || !vehicleData.model) {
        Utils.showAlert('Please select Year, Make, and Model');
        return;
    }
    
    // Show loading screen
    Utils.showLoading();
    
    try {
        // Fetch all data
        const results = await API.fetchVehicleData(vehicleData);
        
        // Display results
        Search.displayResults(results);
        
        // Hide loading and show results
        Utils.hideLoading();
        Utils.scrollToResults();
        
    } catch (error) {
        console.error('Search error:', error);
        Utils.hideLoading();
        Utils.showAlert('An error occurred while searching. Please try again.');
    }
}