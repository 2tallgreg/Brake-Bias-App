// lib/api/specs.js
export async function fetchVehicleSpecs({ year, make, model }) {
  try {
    // Try NHTSA API first (free, no key required)
    const nhtsaData = await fetchNHTSASpecs({ year, make, model });
    
    // Enhance with additional data sources if available
    const enhancedSpecs = {
      ...nhtsaData,
      // Add more detailed specs from other sources
    };
    
    return enhancedSpecs;
  } catch (error) {
    console.error('Error fetching vehicle specs:', error);
    // Return mock data as fallback
    return getMockSpecs({ year, make, model });
  }
}

async function fetchNHTSASpecs({ year, make, model }) {
  try {
    // NHTSA Vehicle API
    const makeResponse = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${year}?format=json`
    );
    
    if (!makeResponse.ok) {
      throw new Error('NHTSA API error');
    }
    
    const makeData = await makeResponse.json();
    
    // Find matching model
    const modelMatch = makeData.Results.find(
      m => m.Model_Name.toLowerCase() === model.toLowerCase()
    );
    
    if (!modelMatch) {
      throw new Error('Model not found in NHTSA database');
    }
    
    // Get detailed vehicle info
    const vinResponse = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${modelMatch.Make_ID}?format=json`
    );
    
    const vinData = await vinResponse.json();
    
    return parseNHTSAData(vinData, modelMatch);
  } catch (error) {
    console.error('NHTSA API error:', error);
    throw error;
  }
}

function parseNHTSAData(data, modelInfo) {
  // Parse NHTSA data into our format
  return {
    make: modelInfo.Make_Name,
    model: modelInfo.Model_Name,
    vehicleType: data.Results[0]?.VehicleTypeName || 'Unknown',
    // NHTSA has limited data, so we'll need to supplement
  };
}

function getMockSpecs({ year, make, model }) {
  // Comprehensive mock data based on common configurations
  const baseSpecs = {
    engineOptions: [
      {
        name: '2.5L 4-Cylinder',
        horsepower: 203,
        torque: 184,
        fuelType: 'Regular Unleaded'
      },
      {
        name: '3.5L V6',
        horsepower: 295,
        torque: 267,
        fuelType: 'Regular Unleaded'
      }
    ],
    transmission: '8-Speed Automatic',
    drivetrain: 'FWD / AWD Available',
    mpg: {
      city: 28,
      highway: 39,
      combined: 32
    },
    fuelCapacity: 15.8,
    seatingCapacity: 5,
    cargoCapacity: {
      behindRearSeat: 15.1,
      rearSeatFolded: 46.5
    },
    dimensions: {
      length: '192.9 in',
      width: '72.8 in',
      height: '56.9 in',
      wheelbase: '111.2 in',
      groundClearance: '5.8 in'
    },
    weight: {
      curb: '3,572 lbs',
      gross: '4,695 lbs'
    },
    towing: {
      capacity: '1,000 lbs'
    },
    warranty: {
      basic: '3 years / 36,000 miles',
      powertrain: '5 years / 60,000 miles',
      corrosion: '5 years / unlimited miles'
    },
    safety: {
      rating: 5,
      agency: 'NHTSA',
      features: [
        'Forward Collision Warning',
        'Automatic Emergency Braking',
        'Lane Departure Warning',
        'Lane Keep Assist',
        'Adaptive Cruise Control',
        'Blind Spot Monitoring',
        'Rear Cross Traffic Alert'
      ]
    },
    colors: {
      exterior: [
        'Super White',
        'Silver Metallic',
        'Magnetic Gray Metallic',
        'Midnight Black Metallic',
        'Ruby Flare Pearl',
        'Blueprint',
        'Celestial Silver Metallic'
      ],
      interior: [
        'Black',
        'Ash',
        'Cockpit Red'
      ]
    },
    submodels: getSubmodelsForVehicle({ make, model })
  };
  
  return baseSpecs;
}

function getSubmodelsForVehicle({ make, model }) {
  const trimDatabase = {
    'Toyota': {
      'Camry': ['LE', 'SE', 'SE Nightshade', 'XLE', 'XSE', 'TRD'],
      'RAV4': ['LE', 'XLE', 'XLE Premium', 'Adventure', 'TRD Off-Road', 'Limited'],
      'Corolla': ['L', 'LE', 'SE', 'SE Nightshade', 'XLE', 'XSE']
    },
    'Honda': {
      'Accord': ['LX', 'Sport', 'Sport Special Edition', 'EX-L', 'Touring'],
      'CR-V': ['LX', 'Special Edition', 'EX', 'EX-L', 'Touring'],
      'Civic': ['LX', 'Sport', 'EX', 'Touring', 'Si', 'Type R']
    },
    'Ford': {
      'F-150': ['Regular Cab', 'SuperCab', 'SuperCrew', 'Raptor', 'Lightning'],
      'Mustang': ['EcoBoost', 'GT', 'Mach 1', 'Shelby GT500'],
      'Explorer': ['Base', 'XLT', 'Limited', 'ST', 'Platinum']
    }
  };
  
  return trimDatabase[make]?.[model] || ['Base', 'Premium', 'Limited'];
}