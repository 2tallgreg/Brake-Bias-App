// lib/cache.js

const cache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60; // Cache Time-To-Live: 1 hour

/**
 * Sets a value in the cache with a TTL.
 * @param {string} key - The key for the cache entry.
 * @param {*} value - The value to store.
 */
export function setCache(key, value) {
  const expires = Date.now() + CACHE_TTL_MS;
  cache.set(key, { value, expires });
  console.log(`[Cache] SET for ${key}`);
}

/**
 * Gets a value from the cache. Returns null if expired or not found.
 * @param {string} key - The key to retrieve from the cache.
 * @returns {*} The cached value or null.
 */
export function getCache(key) {
  const record = cache.get(key);
  if (record) {
    if (Date.now() < record.expires) {
      return record.value;
    }
    // Delete expired record
    cache.delete(key);
  }
  return null;
}