// lib/api/youtube.js
import { google } from 'googleapis';
import { getCache, setCache } from '../cache';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

/**
 * Searches YouTube for video reviews of a specific vehicle.
 * @param {string} vehicleName - The full name of the vehicle.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of video objects.
 */
export async function getVideoReviews(vehicleName) {
  const cacheKey = `youtube-${vehicleName.replace(/\s/g, '-')}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  const searchQuery = `${vehicleName} review`;

  try {
    const response = await Youtube.list({
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults: 3,
      videoEmbeddable: 'true',
    });

    const videos = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    setCache(cacheKey, videos);
    return videos;
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error.message);
    return []; // Return empty array on error
  }
}