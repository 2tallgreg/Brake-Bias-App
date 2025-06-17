// components/results/VehicleHeader.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function VehicleHeader({ vehicleData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { vehicleInfo, images = [] } = vehicleData;
  
  const vehicleName = [
    vehicleInfo.year,
    vehicleInfo.make,
    vehicleInfo.model,
    vehicleInfo.submodel
  ].filter(Boolean).join(' ');

  const handleImageNavigation = (direction) => {
    if (images.length === 0) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${vehicleName} Reviews - Brake Bias`,
          text: `Check out comprehensive reviews for the ${vehicleName}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      className="vehicle-header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-content">
        <div className="vehicle-info">
          <h1 className="vehicle-title">{vehicleName}</h1>
          <div className="vehicle-meta">
            {vehicleData.specs?.drivetrain && (
              <span className="meta-item">{vehicleData.specs.drivetrain}</span>
            )}
            {vehicleData.specs?.engineOptions?.length > 0 && (
              <span className="meta-item">
                {vehicleData.specs.engineOptions.length} Engine{vehicleData.specs.engineOptions.length > 1 ? 's' : ''}
              </span>
            )}
            {vehicleData.professionalSummary?.averageRating && (
              <span className="meta-item rating">
                ⭐ {vehicleData.professionalSummary.averageRating.toFixed(1)}/5
              </span>
            )}
          </div>
        </div>

        <div className="header-actions">
          <button className="action-button" onClick={handleShare} title="Share">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="12" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="12" cy="6" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
          <button className="action-button" title="Save">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          <button className="action-button" onClick={() => window.print()} title="Print">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="image-gallery">
          <div className="main-image-container">
            <img
              src={images[currentImageIndex]}
              alt={`${vehicleName} - View ${currentImageIndex + 1}`}
              className="main-image"
            />
            {images.length > 1 && (
              <>
                <button 
                  className="nav-button prev" 
                  onClick={() => handleImageNavigation('prev')}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  className="nav-button next" 
                  onClick={() => handleImageNavigation('next')}
                  aria-label="Next image"
                >
                  ›
                </button>
                <div className="image-indicators">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .vehicle-header {
          background: var(--bg-secondary);
          padding: 2rem 0;
          margin-bottom: 2rem;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .vehicle-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .vehicle-meta {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .meta-item {
          color: var(--text-secondary);
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .meta-item.rating {
          color: var(--warning);
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-button {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-primary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .image-gallery {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .main-image-container {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(4px);
        }

        .nav-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }

        .nav-button.prev {
          left: 1rem;
        }

        .nav-button.next {
          right: 1rem;
        }

        .image-indicators {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .indicator.active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            padding: 0 1rem;
          }

          .vehicle-title {
            font-size: 1.75rem;
          }

          .vehicle-meta {
            font-size: 0.875rem;
          }

          .header-actions {
            align-self: flex-start;
          }

          .main-image-container {
            height: 250px;
          }

          .image-gallery {
            padding: 0 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
}