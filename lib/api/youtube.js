// lib/api/youtube.js
import { google } from 'googleapis';
import { getCache, setCache } from '../cache';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getVideoReviews(vehicleName) {
  console.log('--- Attempting to fetch YouTube videos. ---');

  // This check will print a very obvious error to your server logs if the key is missing or incorrect.
  if (!process.env.YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY === 'Your_Actual_API_Key_Here') {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('!!! YOUTUBE API KEY IS MISSING OR IS A PLACEHOLDER!                   !!!');
    console.error('!!! Please add `YOUTUBE_API_KEY=YourRealGoogleCloudApiKey` to .env.local !!!');
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return []; // Return empty, which correctly hides the component.
  }

  const cacheKey = `youtube-${vehicleName.replace(/\s/g, '-')}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    console.log(`[Cache] HIT for YouTube: ${cacheKey}`);
    return cachedData;
  }
  console.log(`[Cache] MISS for YouTube: ${cacheKey}`);

  const searchQuery = `${vehicleName} review`;

  try {
    const response = await Youtube.list({
      part: 'snippet',
      q: searchQuery,
      type: 'video',
      maxResults: 3,
      videoDefinition: 'high',
      videoEmbeddable: 'true',
    });
    
    if (!response.data.items || response.data.items.length === 0) {
        console.warn('YouTube API call was successful but returned no items for:', searchQuery);
        return [];
    }

    const videos = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    }));

    console.log(`Successfully fetched ${videos.length} videos from YouTube.`);
    setCache(cacheKey, videos);
    return videos;

  } catch (error) {
    const apiError = error.response ? error.response.data.error : error;
    console.error('--- YOUTUBE API ERROR ---');
    console.error('The YouTube API call failed. This is almost always an issue with the API Key.');
    console.error('Error Details:', JSON.stringify(apiError, null, 2));
    
    if (error.code === 403) {
      console.error('Error Code 403 (Forbidden): This means your YOUTUBE_API_KEY is invalid, expired, or has the wrong restrictions in Google Cloud Console. Check your API key, billing status, and API restrictions (IP/Referrer).');
    }
    if (error.code === 400) {
      console.error('Error Code 400 (Bad Request): This might mean a parameter is wrong, but can also be related to API key setup.');
    }
    
    return [];
  }
}