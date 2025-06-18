// lib/cache.js
const cache = new Map();

// Add the 'export' keyword to both functions
export function getCache(key) {
  return cache.get(key);
}

export function setCache(key, value) {
  cache.set(key, value);
}