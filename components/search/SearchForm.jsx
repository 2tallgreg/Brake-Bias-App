// components/search/SearchForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import YearSelect from './YearSelect';
import MakeSelect from './MakeSelect';
import ModelSelect from './ModelSelect';
import { vehicleDatabase } from '@/lib/constants';
import { validateZipCode } from '@/lib/helpers';

export default function SearchForm({ initialValues = {} }) {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    year: initialValues.year || '',
    make: initialValues.make || '',
    model: initialValues.model || '',
    submodel: initialValues.submodel || '',
    zipcode: initialValues.zipcode || ''
  });

  // Control states
  const [makeDisabled, setMakeDisabled] = useState(true);
  const [modelDisabled, setModelDisabled] = useState(true);
  const [availableModels, setAvailableModels] = useState([]);

  // Enable/disable dropdowns based on selections
  useEffect(() => {
    if (formData.year) {
      setMakeDisabled(false);
    } else {
      setMakeDisabled(true);
      setModelDisabled(true);
      setFormData(prev => ({ ...prev, make: '', model: '' }));
    }
  }, [formData.year]);

  useEffect(() => {
    if (formData.make) {
      setModelDisabled(false);
      setAvailableModels(vehicleDatabase[formData.make] || []);
    } else {
      setModelDisabled(true);
      setFormData(prev => ({ ...prev, model: '' }));
    }
  }, [formData.make]);

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.year || !formData.make || !formData.model) {
      toast.error('Please select Year, Make, and Model');
      return;
    }

    if (formData.zipcode && !validateZipCode(formData.zipcode)) {
      toast.error('Please enter a valid 5-digit ZIP code');
      return;
    }

    setIsSearching(true);

    try {
      // Create search params
      const params = new URLSearchParams({
        year: formData.year,
        make: formData.make,
        model: formData.model,
        ...(formData.submodel && { submodel: formData.submodel }),
        ...(formData.zipcode && { zipcode: formData.zipcode })
      });

      // Navigate to results page
      router.push(`/results?${params.toString()}`);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('An error occurred. Please try again.');
      setIsSearching(false);
    }
  };

  // Get location from browser
  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.loading('Getting your location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // In production, reverse geocode to get ZIP
          // For now, just show success
          toast.success('Location obtained!');
          // const zip = await reverseGeocode(position.coords);
          // handleChange('zipcode', zip);
        } catch (error) {
          toast.error('Could not determine ZIP code from location');
        }
      },
      (error) => {
        toast.error('Unable to retrieve your location');
      }
    );
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="search-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-grid">
        <YearSelect
          value={formData.year}
          onChange={(value) => handleChange('year', value)}
        />

        <MakeSelect
          value={formData.make}
          onChange={(value) => handleChange('make', value)}
          disabled={makeDisabled}
          year={formData.year}
        />

        <ModelSelect
          value={formData.model}
          onChange={(value) => handleChange('model', value)}
          disabled={modelDisabled}
          models={availableModels}
        />

        <div className="input-group">
          <label htmlFor="submodel">Submodel (Optional)</label>
          <input
            type="text"
            id="submodel"
            value={formData.submodel}
            onChange={(e) => handleChange('submodel', e.target.value)}
            placeholder="e.g., Sport, Limited"
            className="form-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="zipcode">
            ZIP Code
            <button
              type="button"
              onClick={handleGetLocation}
              className="location-btn"
              title="Use my location"
            >
              📍
            </button>
          </label>
          <input
            type="text"
            id="zipcode"
            value={formData.zipcode}
            onChange={(e) => handleChange('zipcode', e.target.value)}
            placeholder="12345"
            maxLength="5"
            pattern="[0-9]{5}"
            className="form-input"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSearching}
        className="search-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSearching ? (
          <>
            <span className="loading-spinner" />
            Searching...
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Search Reviews
          </>
        )}
      </motion.button>

      <style jsx>{`
        .search-form {
          background: var(--bg-secondary);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .search-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
        }

        .location-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.25rem;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .location-btn:hover {
          background: var(--bg-primary);
        }

        .search-button {
          width: 100%;
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .search-button:hover:not(:disabled) {
          background-color: #0051D5;
        }

        .search-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .search-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.form>
  );
}