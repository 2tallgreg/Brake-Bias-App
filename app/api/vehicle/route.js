// app/api/vehicle/route.js
import { NextResponse } from 'next/server';
import { fetchProfessionalReviews } from '@/lib/api/reviews';
import { fetchRedditSentiment } from '@/lib/api/reddit';
import { fetchVehicleSpecs } from '@/lib/api/specs';
import { fetchMarketPricing } from '@/lib/api/pricing';
import { analyzeWithClaude } from '@/lib/api/claude';
import { analyzeWithOpenAI } from '@/lib/api/openai';
import { cacheManager } from '@/lib/cache';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const submodel = searchParams.get('submodel');
    const zipcode = searchParams.get('zipcode');

    // Validate required parameters
    if (!year || !make || !model) {
      return NextResponse.json(
        { error: 'Missing required parameters: year, make, model' },
        { status: 400 }
      );
    }

    // Create cache key
    const cacheKey = `vehicle:${year}:${make}:${model}:${submodel || 'base'}`;
    
    // Check cache first
    const cached = await cacheManager.get(cacheKey);
    if (cached) {
      console.log('Returning cached data for:', cacheKey);
      // Add local pricing if zipcode provided
      if (zipcode && !cached.pricing?.localData) {
        cached.pricing = await fetchMarketPricing({ year, make, model, zipcode });
      }
      return NextResponse.json(cached);
    }

    console.log('Fetching fresh data for:', { year, make, model, submodel });

    // Parallel data fetching for better performance
    const [
      specs,
      professionalReviewsRaw,
      redditDataRaw,
      pricing
    ] = await Promise.all([
      // Basic vehicle specs (can use NHTSA API)
      fetchVehicleSpecs({ year, make, model }),
      
      // Scrape professional reviews
      fetchProfessionalReviews({ year, make, model }),
      
      // Fetch Reddit discussions
      fetchRedditSentiment({ year, make, model, limit: 50 }),
      
      // Get pricing data
      fetchMarketPricing({ year, make, model, zipcode })
    ]);

    // Process reviews with AI in parallel
    const [professionalAnalysis, redditAnalysis] = await Promise.all([
      // Use Claude for in-depth professional review analysis
      analyzeWithClaude({
        type: 'professional_reviews',
        reviews: professionalReviewsRaw,
        vehicleInfo: { year, make, model }
      }),
      
      // Use OpenAI for Reddit sentiment analysis
      analyzeWithOpenAI({
        type: 'reddit_sentiment',
        posts: redditDataRaw,
        vehicleInfo: { year, make, model }
      })
    ]);

    // Combine all data
    const vehicleData = {
      vehicleInfo: { year, make, model, submodel },
      specs,
      reviews: professionalAnalysis.reviews,
      professionalSummary: professionalAnalysis.summary,
      reddit: redditAnalysis,
      pricing,
      images: await getVehicleImages({ year, make, model }),
      timestamp: new Date().toISOString()
    };

    // Cache the results (except local pricing)
    const dataToCache = { ...vehicleData };
    if (dataToCache.pricing?.localData) {
      delete dataToCache.pricing.localData;
    }
    await cacheManager.set(cacheKey, dataToCache, 3600); // 1 hour cache

    return NextResponse.json(vehicleData);
    
  } catch (error) {
    console.error('Vehicle API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicle data', details: error.message },
      { status: 500 }
    );
  }
}

// Helper function to get vehicle images
async function getVehicleImages({ year, make, model }) {
  // In production, this could query an image API or CDN
  // For now, return placeholder images
  return [
    `https://source.unsplash.com/800x600/?${year}+${make}+${model}+car+exterior`,
    `https://source.unsplash.com/800x600/?${year}+${make}+${model}+car+interior`,
    `https://source.unsplash.com/800x600/?${year}+${make}+${model}+car+side`
  ];
}