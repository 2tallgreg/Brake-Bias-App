// app/results/page.jsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchBrakeBiasData } from '@/js/api'; // <-- CORRECTED PATH

import VehicleHeader from '@/components/results/VehicleHeader';
import QuickStats from '@/components/results/QuickStats';
import PricingSection from '@/components/results/PricingSection';
import ProfessionalReviews from '@/components/results/ProfessionalReviews';
import RedditSentiment from '@/components/results/RedditSentiment';
import MarketSection from '@/components/results/MarketSection';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorMessage from '@/components/common/ErrorMessage';

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
      zipcode: '90210', // Example zipcode
    };

    if (vehicle.year && vehicle.make && vehicle.model) {
      setLoading(true);
      fetchBrakeBiasData(vehicle)
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
        setError("Missing vehicle information in the URL. Please start a new search.");
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
        year={data.year}
        make={data.make}
        model={data.model}
        submodel={data.submodel}
        tldr={data.tldr}
      />
      <div className="grid-container">
        <div className="main-content">
          <ProfessionalReviews reviews={data.professional_reviews} />
          <RedditSentiment sentiment={data.reddit_sentiment} />
        </div>
        <aside className="sidebar">
          <QuickStats stats={data.specs} />
          <PricingSection pricing={data.pricing} />
          <MarketSection market={data.market} />
        </aside>
      </div>
       <style jsx>{`
        .results-page {
            max-width: 1400px;
            margin: auto;
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
        .main-content {
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