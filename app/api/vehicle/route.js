// app/api/vehicle/route.js
import { NextResponse } from 'next/server';
import { getRedditSentiment } from '@/lib/api/reddit';
import { getProfessionalReviews } from '@/lib/api/reviews';
import { getPricingData } from '@/lib/api/pricing';
import { getSpecs } from '@/lib/api/specs';
import { getSpecsFromWikidata } from '@/lib/api/wikidata'; // <-- Import our new function
import { setCache, getCache } from '@/lib/cache';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const make = searchParams.get('make');
  const model = searchParams.get('model');

  if (!year || !make || !model) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const cacheKey = `vehicle:${year}-${make}-${model}`;
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    // --- TIER 1: WIKIDATA ---
    // First, try to get specs from Wikidata. It's fast and free.
    let specs = await getSpecsFromWikidata(make, model, year);
    
    // Define the promises for the other API calls
    const promises = [
      getPricingData(year, make, model),
      getProfessionalReviews(year, make, model),
      getRedditSentiment(year, make, model),
    ];
    
    // --- TIER 2: AI FALLBACK ---
    // If Wikidata didn't return specs, add the AI-based spec generation to the promises.
    if (!specs) {
      console.log("Fallback: Calling AI for specs.");
      promises.push(getSpecs(year, make, model));
    }

    // Await all the promises together for parallel execution
    const results = await Promise.allSettled(promises);

    // Process the results
    const pricing = results[0].status === 'fulfilled' ? results[0].value : null;
    const reviews = results[1].status === 'fulfilled' ? results[1].value : null;
    const reddit = results[2].status === 'fulfilled' ? results[2].value : null;

    // If we used the AI fallback, specs will be the last result.
    // Otherwise, we use the specs from Wikidata.
    if (!specs) {
       specs = results[3].status === 'fulfilled' ? results[3].value : null;
    }

    const responseData = {
      year,
      make,
      model,
      specs,
      pricing,
      reviews,
      reddit,
    };

    await setCache(cacheKey, responseData);
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicle data' }, { status: 500 });
  }
}