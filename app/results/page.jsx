// app/results/page.jsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import VehicleHeader from '@/components/results/VehicleHeader';
import QuickStats from '@/components/results/QuickStats';
import PricingSection from '@/components/results/PricingSection';
import ProfessionalReviews from '@/components/results/ProfessionalReviews';
import RedditSentiment from '@/components/results/RedditSentiment';
import MarketSection from '@/components/results/MarketSection';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorMessage from '@/components/common/ErrorMessage';
import ImageAndSummary from '@/components/results/ImageAndSummary';
import VideoReviews from '@/components/results/VideoReviews';

// This function now uses GET and passes data via URL params
const fetchBrakeBiasData = async (vehicle) => {
    const params = new URLSearchParams(vehicle);
    const response = await fetch(`/api/brake-bias?${params.toString()}`); // Use GET
    if (!response.ok) {
        // Attempt to parse error, but have a fallback.
        try {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch data');
        } catch (e) {
            // This catches non-JSON responses, like the "Unexpected end of JSON input"
            throw new Error(response.statusText || 'An unknown server error occurred.');
        }
    }
    return response.json();
};

function ResultsPageContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const vehicle = {
      year: searchParams.get('year'),
      make: searchParams.get('make'),
      model: searchParams.get('model'),
      submodel: searchParams.get('submodel'),
      zipcode: searchParams.get('zipcode'),
    };

    // Filter out null/empty params before creating the vehicle string
    const vehicleName = [vehicle.year, vehicle.make, vehicle.model, vehicle.submodel].filter(Boolean).join(' ');
    
    if (vehicle.year && vehicle.make && vehicle.model) {
      setLoading(true);
      fetchBrakeBiasData({ vehicle: vehicleName }) // Pass the single vehicle string
        .then(response => {
          setData(response);
          setError(null);
        })
        .catch(err => {
          console.error("Error in fetchBrakeBiasData:", err);
          setError(err.message || 'An unknown error occurred.');
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
        setError("Missing vehicle information. Please start a new search.");
        setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!data) {
    return <ErrorMessage message="No data was returned for this vehicle." />;
  }

  return (
    <div className="results-page">
      <VehicleHeader
        yearMakeModel={data.vehicle}
        tldr={data.tldr}
      />
      <div className="grid-container">
        <div className="main-content">
          <ImageAndSummary 
            imageUrl={data.images?.imageUrl}
            summary={data.summary}
          />
          <ProfessionalReviews reviews={data.professionalReviews} />
          <RedditSentiment sentiment={data.redditSentiment} />
          <VideoReviews videos={data.videoReviews} />
        </div>
        <aside className="sidebar">
          <QuickStats
             engine_options={data.specs?.engine_options || [{ name: data.specs?.engine, specs: `${data.specs?.horsepower}, ${data.specs?.torque}`}]}
             drivetrain={data.specs?.drivetrain}
             transmission_options={data.specs ? [data.specs.transmission] : []}
          />
          <PricingSection 
            msrp={data.pricing?.msrp}
            usedAvg={data.pricing?.usedAvg}
          />
          <MarketSection listingsLink={data.autoTempestLink} />
        </aside>
      </div>
       <style jsx>{`
        .results-page {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 1.5rem;
        }
        .grid-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        @media (min-width: 1024px) {
            .grid-container {
                grid-template-columns: 2fr 1fr;
            }
        }
        .main-content, .sidebar {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
      `}</style>
    </div>
  );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <ResultsPageContent />
        </Suspense>
    )
}