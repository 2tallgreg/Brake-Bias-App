// app/results/page.jsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import VehicleHeader from '@/components/results/VehicleHeader';
import QuickStats from '@/components/results/QuickStats';
import SpecsCard from '@/components/results/SpecsCard';
import PricingSection from '@/components/results/PricingSection';
import ProfessionalReviews from '@/components/results/ProfessionalReviews';
import RedditSentiment from '@/components/results/RedditSentiment';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorMessage from '@/components/common/ErrorMessage';
import MarketSection from '@/components/results/MarketSection';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      const params = new URLSearchParams(searchParams);
      if (!params.get('make')) {
        setError("Vehicle data is missing from your search.");
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/vehicle?${params.toString()}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }
        const data = await response.json();
        setVehicleData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleData();
  }, [searchParams]);

  // --- FIX IS HERE ---
  // Handle the loading state explicitly.
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Handle any errors that occurred during the fetch.
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Handle the case where the fetch succeeded but returned no data.
  if (!vehicleData) {
    return <ErrorMessage message="No data was found for the requested vehicle." />;
  }
  
  // By this point, we are GUARANTEED to have vehicleData.
  // It is now safe to render the components that depend on it.
  return (
    <div className="results-container">
      <VehicleHeader vehicleInfo={vehicleData} />
      <div className="main-content">
        <div className="left-column">
          <PricingSection pricing={vehicleData.pricing} />
          <SpecsCard specs={vehicleData.specs} />
          <MarketSection make={vehicleData.make} model={vehicleData.model} />
        </div>
        <div className="right-column">
          <QuickStats
            pricing={vehicleData.pricing}
            specs={vehicleData.specs}
            sentiment={vehicleData.reddit?.sentiment}
          />
          <RedditSentiment reddit={vehicleData.reddit} />
          <ProfessionalReviews reviews={vehicleData.reviews} />
        </div>
      </div>
      <style jsx>{`
        /* Your existing styles are fine */
        .results-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }
        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }
        .left-column, .right-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}