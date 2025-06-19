// app/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { vehicleDatabase } from '@/lib/constants';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [submodel, setSubmodel] = useState('');
  const [zipcode, setZipcode] = useState('');
  
  const [models, setModels] = useState([]);

  const handleMakeChange = (selectedMake) => {
    setMake(selectedMake);
    setModel('');
    // In a real app, you might filter models by year/make here
    setModels(vehicleDatabase[selectedMake] || []);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!year || !make || !model) {
        alert('Please select a Year, Make, and Model.');
        return;
    }
    // Construct search params and navigate to the results page
    const params = new URLSearchParams({ year, make, model });
    if (submodel) params.append('submodel', submodel);
    if (zipcode) params.append('zipcode', zipcode);
    router.push(`/results?${params.toString()}`);
  };

  // Generate years for dropdown
  const currentYear = new Date().getFullYear() + 1;
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);
  const makes = Object.keys(vehicleDatabase).sort();

  return (
    <div className="home-container">
        <div className="hero-section">
            <Image src="/logo.jpg" alt="Brake Bias Logo" width={100} height={100} className="logo" />
            <h1 className="title">Brake Bias</h1>
            <p className="tagline">Stop Guessing. Start Driving.</p>
        </div>

        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
                <div className="input-row">
                    <select value={year} onChange={(e) => setYear(e.target.value)} required className="form-input">
                        <option value="">Select Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <select value={make} onChange={(e) => handleMakeChange(e.target.value)} required className="form-input" disabled={!year}>
                        <option value="">Select Make</option>
                        {makes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={model} onChange={(e) => setModel(e.target.value)} required className="form-input" disabled={!make}>
                        <option value="">Select Model</option>
                        {models.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div className="input-row">
                    <input type="text" value={submodel} onChange={(e) => setSubmodel(e.target.value)} placeholder="Submodel (e.g., TRD, Sport)" className="form-input" />
                    <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="ZIP Code (Optional)" className="form-input" />
                </div>
                <button type="submit" className="search-button">Analyze</button>
            </form>
             <p className="form-footer-text">Don't worry, we'll do the hard work. You just drive.</p>
        </div>

      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 2rem;
          text-align: center;
        }
        .hero-section {
            margin-bottom: 2rem;
        }
        .logo {
            border-radius: 16px;
            margin-bottom: 1rem;
        }
        .title {
          font-family: 'Roboto Mono', monospace;
          font-size: 3rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .tagline {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
        }
        .search-container {
            width: 100%;
            max-width: 800px;
            background: var(--bg-secondary);
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px var(--shadow);
            border: 1px solid var(--border);
        }
        .search-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .input-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }
        .form-input {
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
            font-size: 1rem;
            border: 1px solid var(--border);
            background-color: var(--bg-primary);
            color: var(--text-primary);
        }
        .form-input:focus {
           outline: none;
           border-color: var(--primary);
           box-shadow: 0 0 0 3px var(--primary-shadow, rgba(215, 38, 56, 0.2));
        }
        .form-input:disabled {
            background-color: var(--border);
            cursor: not-allowed;
        }
        .search-button {
          padding: 1rem;
          width: 100%;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .search-button:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
        .form-footer-text {
            margin-top: 1.5rem;
            font-size: 0.875rem;
            color: var(--text-tertiary);
            font-style: italic;
        }

        @media (max-width: 768px) {
            .input-row {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </div>
  );
}