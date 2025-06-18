import React, { useState, useEffect } from 'react';
import { Search, Car, DollarSign, MessageSquare, Star, TrendingUp, Gauge, Fuel, Settings, Users } from 'lucide-react';
import Image from 'next/image';

const CarResearchTool = () => {
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    submodel: '',
    zipcode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [carData, setCarData] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentLoadingStep, setCurrentLoadingStep] = useState('');
  const [error, setError] = useState(null);

  // Available data (using your existing vehicle database)
  const vehicleDatabase = {
    'Toyota': ['Camry', 'RAV4', 'Corolla', 'Highlander', 'Prius', 'Tacoma', 'Tundra', '4Runner'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V', 'Ridgeline', 'Odyssey'],
    'Ford': ['F-150', 'Mustang', 'Explorer', 'Edge', 'Escape', 'Bronco', 'Ranger'],
    'Chevrolet': ['Silverado', 'Camaro', 'Equinox', 'Malibu', 'Traverse', 'Tahoe'],
    'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X7', 'M3', 'M5'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS'],
    'Audi': ['A4', 'A6', 'Q5', 'Q7', 'Q8', 'RS5', 'RS6'],
    'Lexus': ['ES', 'IS', 'RX', 'GX', 'LX', 'NX', 'UX'],
    'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Titan', 'Z', 'GT-R'],
    'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Genesis']
  };

  const loadingSteps = [
    'Searching professional reviews...',
    'Analyzing Reddit discussions...',
    'Gathering market pricing data...',
    'Compiling owner sentiment...',
    'Processing brake bias data...',
    'Finalizing comprehensive report...'
  ];

  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      setCurrentLoadingStep(loadingSteps[0]);
      setError(null);
      
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 12, 100);
          
          const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
          if (stepIndex < loadingSteps.length) {
            setCurrentLoadingStep(loadingSteps[stepIndex]);
          }
          
          if (newProgress >= 100) {
            clearInterval(interval);
            // Simulate API call completion
            setTimeout(() => {
              fetchVehicleData();
            }, 500);
            return 100;
          }
          
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const fetchVehicleData = async () => {
    try {
      // Call your existing vehicle API
      const params = new URLSearchParams({
        year: formData.year,
        make: formData.make,
        model: formData.model,
        ...(formData.submodel && { submodel: formData.submodel }),
        ...(formData.zipcode && { zipcode: formData.zipcode })
      });

      const response = await fetch(`/api/vehicle?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }

      const data = await response.json();
      setCarData(data);
      setIsLoading(false);
      
    } catch (err) {
      console.error('Error fetching vehicle data:', err);
      setError('Unable to find reviews for this vehicle. Please try another search.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset dependent fields
    if (field === 'make') {
      setFormData(prev => ({ ...prev, model: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.year || !formData.make || !formData.model) {
      setError('Please select Year, Make, and Model');
      return;
    }

    setIsLoading(true);
    setCarData(null);
    setError(null);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (data.address && data.address.postcode) {
            setFormData(prev => ({ ...prev, zipcode: data.address.postcode }));
          }
        } catch (err) {
          console.error("Error fetching zip code:", err);
        }
      }, (err) => {
        console.error("Error getting location:", err);
      });
    }
  };

  // Get current year for dropdown
  const getCurrentYear = () => new Date().getFullYear() + 1;
  const years = Array.from({ length: getCurrentYear() - 1884 }, (_, i) => getCurrentYear() - i);

  // Get available makes
  const makes = Object.keys(vehicleDatabase).sort();

  // Get available models for selected make
  const models = formData.make ? vehicleDatabase[formData.make] || [] : [];

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-sans transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          {/* Car Wheel Loading Animation */}
          <div className="relative mb-8">
            <div 
              className="w-24 h-24 border-8 border-gray-300 border-t-red-500 rounded-full mx-auto"
              style={{
                animation: 'spin 1s linear infinite',
                borderStyle: 'solid',
                borderTopColor: '#ef4444'
              }}
            ></div>
            {/* Wheel spokes */}
            <div 
              className="absolute inset-0 w-24 h-24 mx-auto"
              style={{ animation: 'spin 1s linear infinite' }}
            >
              <div className="absolute w-1 h-8 bg-gray-400 left-1/2 top-2 transform -translate-x-1/2"></div>
              <div className="absolute w-1 h-8 bg-gray-400 left-1/2 bottom-2 transform -translate-x-1/2"></div>
              <div className="absolute w-8 h-1 bg-gray-400 top-1/2 left-2 transform -translate-y-1/2"></div>
              <div className="absolute w-8 h-1 bg-gray-400 top-1/2 right-2 transform -translate-y-1/2"></div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Aggregating Vehicle Reviews</h3>
          <p className="text-lg mb-6">{currentLoadingStep}</p>
          
          <div className="w-80 bg-gray-300 dark:bg-gray-700 rounded-full h-3 mb-4 mx-auto">
            <div 
              className="bg-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">{Math.round(Math.min(loadingProgress, 100))}% Complete</p>
        </div>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If we have results, show them
  if (carData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-sans transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          {/* Back to Search Button */}
          <div className="mb-6">
            <button
              onClick={() => setCarData(null)}
              className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Search</span>
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Vehicle Info Header */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {carData.vehicleInfo.year} {carData.vehicleInfo.make} {carData.vehicleInfo.model}
                    {carData.vehicleInfo.submodel && ` ${carData.vehicleInfo.submodel}`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Professional Reviews & Owner Sentiment Analysis
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Professional Rating</div>
                  <div className="text-2xl font-bold text-red-600">
                    {carData.professionalSummary?.averageRating ? 
                      `${carData.professionalSummary.averageRating.toFixed(1)}/5` : 
                      'N/A'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl">
              <div className="border-b border-gray-300 dark:border-gray-600">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'specs', label: 'Specifications', icon: Settings },
                    { id: 'reviews', label: 'Professional Reviews', icon: Star },
                    { id: 'sentiment', label: 'Owner Sentiment', icon: MessageSquare },
                    { id: 'pricing', label: 'Market Value', icon: DollarSign }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-red-500 text-red-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Specifications Tab */}
                {activeTab === 'specs' && carData.specs && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold mb-4">Engine & Performance</h4>
                      <div className="space-y-3">
                        {carData.specs.engineOptions && carData.specs.engineOptions.length > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Engine</span>
                            <span className="font-medium">{carData.specs.engineOptions[0].name}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Transmission</span>
                          <span className="font-medium">{carData.specs.transmission || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Drivetrain</span>
                          <span className="font-medium">{carData.specs.drivetrain || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold mb-4">Fuel Economy</h4>
                      <div className="space-y-3">
                        {carData.specs.mpg && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">City MPG</span>
                              <span className="font-medium">{carData.specs.mpg.city}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Highway MPG</span>
                              <span className="font-medium">{carData.specs.mpg.highway}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {carData.reviews && carData.reviews.length > 0 ? (
                      <>
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-semibold">
                            Average Professional Rating: {carData.professionalSummary?.averageRating?.toFixed(1) || 'N/A'}/5
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">Based on {carData.reviews.length} professional reviews</p>
                        </div>
                        
                        <div className="space-y-4">
                          {carData.reviews.map((review, index) => (
                            <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-semibold text-red-600">{review.source}</h5>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{review.rating}/5</span>
                                </div>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 italic">"{review.snippet}"</p>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="text-center text-gray-500">No professional reviews available</p>
                    )}
                  </div>
                )}

                {/* Owner Sentiment Tab */}
                {activeTab === 'sentiment' && (
                  <div className="space-y-6">
                    {carData.reddit ? (
                      <>
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-semibold">
                            Owner Sentiment: {Math.round((carData.reddit.sentimentScore || 0.7) * 100)}% Positive
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            Based on {carData.reddit.totalPosts} discussions from Reddit
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-800 dark:text-green-400 mb-3">What Owners Love</h5>
                            <div className="space-y-2">
                              {carData.reddit.sentiment.positive.slice(0, 5).map((item, index) => (
                                <span key={index} className="inline-block bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm mr-2 mb-2">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-3">Mixed Opinions</h5>
                            <div className="space-y-2">
                              {carData.reddit.sentiment.neutral.slice(0, 5).map((item, index) => (
                                <span key={index} className="inline-block bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-sm mr-2 mb-2">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                            <h5 className="font-semibold text-red-800 dark:text-red-400 mb-3">Common Complaints</h5>
                            <div className="space-y-2">
                              {carData.reddit.sentiment.negative.slice(0, 5).map((item, index) => (
                                <span key={index} className="inline-block bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm mr-2 mb-2">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-center text-gray-500">No owner sentiment data available</p>
                    )}
                  </div>
                )}

                {/* Pricing Tab */}
                {activeTab === 'pricing' && (
                  <div className="space-y-6">
                    {carData.pricing ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {carData.pricing.msrp && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center space-x-3 mb-3">
                              <TrendingUp className="h-6 w-6 text-blue-600" />
                              <h4 className="font-semibold text-blue-800 dark:text-blue-400">New (MSRP)</h4>
                            </div>
                            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                              ${carData.pricing.msrp.average?.toLocaleString() || 'N/A'}
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                              Average new price
                            </p>
                          </div>
                        )}

                        {carData.pricing.usedMarket && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center space-x-3 mb-3">
                              <DollarSign className="h-6 w-6 text-green-600" />
                              <h4 className="font-semibold text-green-800 dark:text-green-400">Used Market</h4>
                            </div>
                            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                              ${carData.pricing.usedMarket.average?.toLocaleString() || 'N/A'}
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                              Average used price
                            </p>
                          </div>
                        )}

                        {carData.pricing.localData && (
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center space-x-3 mb-3">
                              <Car className="h-6 w-6 text-purple-600" />
                              <h4 className="font-semibold text-purple-800 dark:text-purple-400">Local Market</h4>
                            </div>
                            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                              {carData.pricing.localData.listings} available
                            </div>
                            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
                              In your area
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">No pricing data available</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default splash screen (matches your original design)
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-2">
            <Image src="/images/logo.png" alt="Brake Bias Logo" width={350} height={80} priority />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Your definitive source for aggregated car reviews.</p>
        </header>

        <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Year Dropdown */}
              <select 
                value={formData.year} 
                onChange={(e) => handleInputChange('year', e.target.value)} 
                required 
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>

              {/* Make Dropdown */}
              <select 
                value={formData.make} 
                onChange={(e) => handleInputChange('make', e.target.value)} 
                required 
                disabled={!formData.year}
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">Select Make</option>
                {makes.map(make => <option key={make} value={make}>{make}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Model Dropdown */}
              <select 
                value={formData.model} 
                onChange={(e) => handleInputChange('model', e.target.value)} 
                required 
                disabled={!formData.make}
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">Select Model</option>
                {models.map(model => <option key={model} value={model}>{model}</option>)}
              </select>

              {/* Submodel Dropdown */}
              <select 
                value={formData.submodel} 
                onChange={(e) => handleInputChange('submodel', e.target.value)} 
                disabled={!formData.model}
                className="p-3 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                <option value="">All Trims (Optional)</option>
                {/* Add submodel options here if you have them */}
              </select>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={formData.zipcode} 
                  onChange={(e) => handleInputChange('zipcode', e.target.value)} 
                  placeholder="Zip for Local Pricing (Optional)" 
                  className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" 
                />
                <button 
                  type="button" 
                  onClick={handleLocationClick} 
                  title="Use my location" 
                  className="p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                  📍
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full mt-6 p-3 bg-red-600 rounded-md font-bold hover:bg-red-700 transition-colors duration-300 text-white" 
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Get Review'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-800/80 text-white p-4 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarResearchTool;