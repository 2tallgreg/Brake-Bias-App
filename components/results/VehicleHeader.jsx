// components/results/VehicleHeader.jsx
'use client';

import { useState } from 'react';
import { Share2, Bookmark } from 'lucide-react';

// This component is already correct, it expects 'vehicleData'
export default function VehicleHeader({ vehicleData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { vehicleInfo, images = [] } = vehicleData; // This will now work correctly

  const vehicleName = [
    vehicleInfo.year,
    vehicleInfo.make,
    vehicleInfo.model,
    vehicleInfo.submodel,
  ]
    .filter(Boolean)
    .join(' ');

  // ... rest of the component is fine
}