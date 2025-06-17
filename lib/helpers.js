// lib/helpers.js

// Validation helpers
export function validateZipCode(zipcode) {
  return /^\d{5}$/.test(zipcode);
}

export function validateYear(year) {
  const currentYear = new Date().getFullYear() + 2;
  return year >= 1885 && year <= currentYear;
}

// Formatting helpers
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

// Vehicle name formatting
export function formatVehicleName(vehicleInfo) {
  const parts = [
    vehicleInfo.year,
    vehicleInfo.make,
    vehicleInfo.model,
    vehicleInfo.submodel
  ].filter(Boolean);
  
  return parts.join(' ');
}

// Local storage helpers
export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    return false;
  }
}

export function getFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Failed to get from localStorage:', e);
    return defaultValue;
  }
}