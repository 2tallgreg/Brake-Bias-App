// lib/api/wikimedia.js
import { getCache, setCache } from '../cache';

/**
 * Fetches the primary image URL and summary for a vehicle from Wikimedia.
 * @param {string} vehicleName - The name of the vehicle.
 * @returns {Promise<object>} - An object containing the imageUrl and summary.
 */
export async function getImages(vehicleName) {
  const cacheKey = `wikimedia-data-${vehicleName.replace(/\s/g, '-')}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const imageUrlPromise = (async () => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(vehicleName)}&prop=pageimages&format=json&pithumbsize=500&origin=*`;
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId].thumbnail?.source || null;
  })();

  const summaryPromise = (async () => {
     const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=${encodeURIComponent(vehicleName)}&origin=*`;
     const response = await fetch(url);
     const data = await response.json();
     const pages = data.query.pages;
     const pageId = Object.keys(pages)[0];
     return pages[pageId].extract || null;
  })();
  
  try {
    const [imageUrl, summary] = await Promise.all([imageUrlPromise, summaryPromise]);
    const result = { imageUrl, summary };
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error fetching from Wikimedia:", error);
    return { imageUrl: null, summary: null };
  }
}