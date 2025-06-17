// app/results/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import VehicleHeader from '@/components/results/VehicleHeader';
import QuickStats from '@/components/results/QuickStats';
import SpecsCard from '@/components/results/SpecsCard';
import ProfessionalReviews from '@/components/results/ProfessionalReviews';
import RedditSentiment from '@/components/results/RedditSentiment';
import PricingSection from '@/components/results/PricingSection';
import MarketSection from '@/components/results/MarketSection';
import LoadingScreen from '@/components/common/LoadingScreen';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Extract search parameters
  const year = searchParams.get('year');
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const submodel = searchParams.get('submodel');
  const zipcode = searchParams.get('zipcode');

  useEffect(() => {
    if (year && make && model) {
      fetchVehicleData();
    }
  }, [year, make, model, submodel, zipcode]);

  const fetchVehicleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        year,
        make,
        model,
        ...(submodel && { submodel }),
        ...(zipcode && { zipcode })
      });

      const response = await fetch(`/api/vehicle?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }

      const data = await response.json();
      setVehicleData(data);
    } catch (err) {
      console.error('Error fetching vehicle data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={fetchVehicleData} />;
  }

  if (!vehicleData) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>No Data Found</h2>
          <p>Unable to find reviews for this vehicle.</p>
          <Link href="/" className="btn btn-primary">
            Search Again
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'sentiment', label: 'Owner Sentiment' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'market', label: 'Find One' }
  ];

  return (
    <div className="results-page">
      <VehicleHeader vehicleData={vehicleData} />
      
      <div className="container">
        <QuickStats vehicleData={vehicleData} />

        {/* Navigation Tabs */}
        <div className="tabs-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="tab-content"
        >
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <SpecsCard specs={vehicleData.specs} variant="compact" />
              <ProfessionalReviews 
                reviews={vehicleData.reviews} 
                summary={vehicleData.professionalSummary}
                variant="summary"
              />
              <RedditSentiment 
                reddit={vehicleData.reddit}
                variant="summary"
              />
            </div>
          )}

          {activeTab === 'specs' && (
            <SpecsCard specs={vehicleData.specs} variant="detailed" />
          )}

          {activeTab === 'reviews' && (
            <ProfessionalReviews 
              reviews={vehicleData.reviews} 
              summary={vehicleData.professionalSummary}
              variant="detailed"
            />
          )}

          {activeTab === 'sentiment' && (
            <RedditSentiment 
              reddit={vehicleData.reddit}
              variant="detailed"
            />
          )}

          {activeTab === 'pricing' && (
            <PricingSection 
              pricing={vehicleData.pricing}
              vehicleInfo={vehicleData.vehicleInfo}
            />
          )}

          {activeTab === 'market' && (
            <MarketSection 
              vehicleInfo={vehicleData.vehicleInfo}
              pricing={vehicleData.pricing}
            />
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .results-page {
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .tabs-navigation {
          display: flex;
          gap: 1rem;
          margin: 2rem 0;
          border-bottom: 2px solid var(--border);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .tab-button:hover {
          color: var(--text-primary);
        }

        .tab-button.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        .tab-content {
          margin-top: 2rem;
        }

        .overview-grid {
          display: grid;
          gap: 2rem;
        }

        .error-container {
          text-align: center;
          padding: 4rem 0;
        }

        .error-container h2 {
          margin-bottom: 1rem;
        }

        .error-container p {
          margin-bottom: 2rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

          .tabs-navigation {
            gap: 0.5rem;
          }

          .tab-button {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}