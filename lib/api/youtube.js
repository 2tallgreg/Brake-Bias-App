// lib/api/youtube.js
import { google } from 'googleapis';
import { getCache, setCache } from '../cache';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

/**
 * Searches YouTube for video reviews of a specific vehicle.
 * @param {string} vehicleName - The full name of the vehicle (e.g., "2023 Ford Mustang GT").
 * @returns {Promise<Array<object>>} A promise that resolves to an array of video objects.
 */
export async function searchYouTubeReviews(vehicleName) {
  const cacheKey = `youtube-${vehicleName.replace(/\s/g, '-')}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    console.log(`[Cache] HIT for YouTube key: ${cacheKey}`);
    return cachedData;
  }
  console.log(`[Cache] MISS for YouTube key: ${cacheKey}. Fetching from YouTube API.`);

  // To get more relevant results, we add terms like "review", "car review", etc.
  const searchQuery = `${vehicleName} review`;

  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults: 3, // Let's fetch 3 videos to start
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
    // Return an empty array or mock data on error to prevent crashing the page
    return [
        { id: 'mock1', title: `Mock Review of the ${vehicleName}`, channel: 'MockChannel', thumbnail: 'https://placehold.co/480x360/1A1A1A/FFFFFF?text=Mock+Video' },
        { id: 'mock2', title: `Is the ${vehicleName} Worth It?`, channel: 'MockReviews', thumbnail: 'https://placehold.co/480x360/D72638/FFFFFF?text=Mock+Video' }
    ];
  }
}
