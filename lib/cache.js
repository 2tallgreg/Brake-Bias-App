// lib/cache.js
import NodeCache from 'node-cache';

class CacheManager {
  constructor() {
    // Initialize with 1 hour default TTL
    this.cache = new NodeCache({ 
      stdTTL: 3600,
      checkperiod: 600,
      useClones: false
    });
  }

  // Get item from cache
  async get(key) {
    try {
      const value = this.cache.get(key);
      if (value) {
        console.log(`Cache hit for key: ${key}`);
        return value;
      }
      console.log(`Cache miss for key: ${key}`);
      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Set item in cache with optional TTL
  async set(key, value, ttl = null) {
    try {
      if (ttl) {
        this.cache.set(key, value, ttl);
      } else {
        this.cache.set(key, value);
      }
      console.log(`Cached key: ${key}`);
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  // Delete item from cache
  async del(key) {
    try {
      this.cache.del(key);
      console.log(`Deleted cache key: ${key}`);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  // Clear all cache
  async flush() {
    try {
      this.cache.flushAll();
      console.log('Cache flushed');
      return true;
    } catch (error) {
      console.error('Cache flush error:', error);
      return false;
    }
  }

  // Get cache statistics
  getStats() {
    return this.cache.getStats();
  }
}

// Create singleton instance
export const cacheManager = new CacheManager();

// Cache key generators
export const cacheKeys = {
  vehicle: (year, make, model, submodel = '') => 
    `vehicle:${year}:${make}:${model}:${submodel}`.toLowerCase(),
  
  reviews: (year, make, model) => 
    `reviews:${year}:${make}:${model}`.toLowerCase(),
  
  reddit: (year, make, model) => 
    `reddit:${year}:${make}:${model}`.toLowerCase(),
  
  specs: (year, make, model) => 
    `specs:${year}:${make}:${model}`.toLowerCase(),
  
  pricing: (year, make, model, zipcode = '') => 
    `pricing:${year}:${make}:${model}:${zipcode}`.toLowerCase()
};

// Cache TTL configurations (in seconds)
export const cacheTTL = {
  vehicle: 3600,      // 1 hour
  reviews: 86400,     // 24 hours
  reddit: 3600,       // 1 hour
  specs: 604800,      // 7 days
  pricing: 1800       // 30 minutes
};