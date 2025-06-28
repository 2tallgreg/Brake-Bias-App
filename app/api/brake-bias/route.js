// app/api/brake-bias/route.js
import { NextResponse } from 'next/server';
import { getCache, setCache } from '@/lib/cache';
import { getProfessionalReviews } from '@/lib/api/reviews';
import { getRedditSentiment } from '@/lib/api/reddit';
import { getVehicleSpecs } from '@/lib/api/specs';
import { getPricing } from '@/lib/api/pricing';
import { getImages } from '@/lib/api/wikimedia';
import { getVideoReviews } from '@/lib/api/youtube';
import { generateSummary } from '@/lib/api/brake-bias';

// Helper function to process settled promises
const processSettledPromise = (result, sourceName) => {
    if (result.status === 'fulfilled') {
        return result.value;
    }
    console.error(`Error fetching ${sourceName}:`, result.reason);
    return null; // Return null for failed sources
};

// Helper function to create AutoTempest link
const createAutoTempestLink = (vehicleString, zipcode) => {
    const parts = vehicleString.split(' ');
    const year = parts[0];
    const make = parts[1];
    const modelAndSubmodel = parts.slice(2).join(' ');

    const params = {
        make,
        model: modelAndSubmodel,
        minyear: year,
        maxyear: year,
    };
    
    if (zipcode) {
        params.zip = zipcode;
        params.radius = 200;
    }

    return `https://www.autotempest.com/results?${new URLSearchParams(params).toString()}`;
}


export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const vehicle = searchParams.get('vehicle');
    const zipcode = searchParams.get('zipcode');

    if (!vehicle) {
        return NextResponse.json({ error: 'Vehicle query parameter is required.' }, { status: 400 });
    }

    const cacheKey = `vehicle_data:${vehicle.toLowerCase().replace(/\s+/g, '_')}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
        console.log(`[Cache] HIT for ${vehicle}`);
        return NextResponse.json(cachedData);
    }
    console.log(`[Cache] MISS for ${vehicle}`);

    try {
        // Generate AutoTempest Link
        const autoTempestLink = createAutoTempestLink(vehicle, zipcode);

        // --- Parallel Data Fetching ---
        const [
            reviewsResult,
            redditResult,
            specsResult,
            pricingResult,
            imagesResult,
            videoReviewsResult
        ] = await Promise.allSettled([
            getProfessionalReviews(vehicle),
            getRedditSentiment(vehicle),
            getVehicleSpecs(vehicle),
            getPricing(vehicle),
            getImages(vehicle),
            getVideoReviews(vehicle)
        ]);

        // --- Process Results ---
        const professionalReviews = processSettledPromise(reviewsResult, 'Professional Reviews');
        const redditSentiment = processSettledPromise(redditResult, 'Reddit Sentiment');
        const specs = processSettledPromise(specsResult, 'Vehicle Specs');
        const pricing = processSettledPromise(pricingResult, 'Pricing');
        const images = processSettledPromise(imagesResult, 'Images');
        const videoReviews = processSettledPromise(videoReviewsResult, 'Video Reviews');

        // --- Final Aggregation & Summary ---
        const summaryData = {
            vehicle,
            professionalReviews,
            redditSentiment,
            specs,
            pricing
        };
        
        const summary = await generateSummary(summaryData);

        const responseData = {
            vehicle,
            ...summary, // Includes TLDR and detailed summary
            pricing,
            drivetrain: specs?.drivetrain || null,
            professionalReviews,
            redditSentiment,
            images,
            videoReviews,
            specs,
            autoTempestLink, // Include the AutoTempest link
        };

        setCache(cacheKey, responseData);
        return NextResponse.json(responseData);

    } catch (error) {
        console.error(`[Brake Bias API Error] Failed to fetch data for ${vehicle}:`, error);
        return NextResponse.json(
            { error: `Failed to retrieve review data for ${vehicle}.` },
            { status: 500 }
        );
    }
}