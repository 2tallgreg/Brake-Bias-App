'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchBrakeBiasData } from '@/lib/api/brake-bias';

import VehicleHeader from '@/components/results/VehicleHeader';
import QuickStats from '@/components/results/QuickStats';
import PricingSection from '@/components/results/PricingSection';
import ProfessionalReviews from '@/components/results/ProfessionalReviews';
import RedditSentiment from '@/components/results/RedditSentiment';
import MarketSection from '@/components/results/MarketSection';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingScreen from '@/components/common/LoadingScreen';

function Results() {
    const searchParams = useSearchParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const vehicle = {
            year: searchParams.get('year'),
            make: searchParams.get('make'),
            model: searchParams.get('model'),
            submodel: searchParams.get('submodel'),
            zipcode: searchParams.get('zipcode')
        };

        if (vehicle.year && vehicle.make && vehicle.model) {
            setLoading(true);
            setError(null);
            fetchBrakeBiasData(vehicle)
                .then(setData)
                .catch(setError)
                .finally(() => setLoading(false));
        } else {
            setError('Missing required vehicle information (Year, Make, Model).');
            setLoading(false);
        }
    }, [searchParams]);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorMessage message={error} />;
    if (!data) return <ErrorMessage message="No data found for the specified vehicle." />;

    return (
        <div className="results-container">
            <VehicleHeader
                year={data.year}
                make={data.make}
                model={data.model}
                submodel={data.submodel}
                tldr={data.tldr}
            />
            <div className="main-content-grid">
                <div className="left-column">
                    <SpecsCard title="Quick Stats" data={data.quickStats} />
                    <RedditSentiment data={data.ownerSentiment} />
                </div>
                <div className="right-column">
                    <PricingSection msrp={data.pricing.msrp} usedAvg={data.pricing.usedAvg} />
                    <ProfessionalReviews reviews={data.reviews} />
                    <MarketSection listings={data.market.listings} history={data.market.history} />
                </div>
            </div>
            
            <style jsx>{`
                .results-container {
                    max-width: 1200px;
                    margin: 2rem auto;
                    padding: 0 1rem;
                }
                .main-content-grid {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 2rem;
                    margin-top: 2rem;
                }
                .left-column, .right-column {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                @media (max-width: 900px) {
                    .main-content-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

// Wrap the component in a Suspense boundary because useSearchParams() requires it.
export default function ResultsPage() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Results />
        </Suspense>
    );
}