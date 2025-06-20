// lib/api/wikimedia.js
import { getCache, setCache } from '../cache';

/**
 * Fetches the primary image URL for a vehicle from Wikimedia Commons.
 * @param {string} vehicleName - The name of the vehicle.
 * @returns {Promise<string|null>} - The URL of the image or null.
 */
async function fetchVehicleImageFromWikimedia(vehicleName) {
  const cacheKey = `wikimedia-image-${vehicleName}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(vehicleName)}&prop=pageimages&format=json&pithumbsize=500&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const imageUrl = pages[pageId].thumbnail?.source || null;

    setCache(cacheKey, imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image from Wikimedia:", error);
    return null;
  }
}

/**
 * Fetches a short summary of a vehicle from Wikipedia.
 * @param {string} vehicleName - The name of the vehicle.
 * @returns {Promise<string|null>} - The summary text or null.
 */
async function fetchVehicleSummaryFromWikipedia(vehicleName) {
  const cacheKey = `wikipedia-summary-${vehicleName}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;
  
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=${encodeURIComponent(vehicleName)}&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const summary = pages[pageId].extract || null;
    
    setCache(cacheKey, summary);
    return summary;
  } catch (error) {
    console.error("Error fetching summary from Wikipedia:", error);
    return null;
  }
}

/**
 * Fetches all data from Wikimedia APIs.
 * @param {string} vehicleName - The name of the vehicle.
 * @returns {Promise<object>} - An object containing the image URL and summary.
 */
export async function fetchWikimediaData(vehicleName) {
    const [imageUrl, summary] = await Promise.all([
        fetchVehicleImageFromWikimedia(vehicleName),
        fetchVehicleSummaryFromWikipedia(vehicleName),
    ]);
    return { imageUrl, summary };
}