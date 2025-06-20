// lib/api/brake-bias.js

/**
 * Fetches brake bias data for a vehicle
 * @param {Object} vehicle - Vehicle details
 * @param {string} vehicle.year - Vehicle year
 * @param {string} vehicle.make - Vehicle make
 * @param {string} vehicle.model - Vehicle model
 * @param {string} [vehicle.submodel] - Vehicle submodel (optional)
 * @param {string} [vehicle.zipcode] - User's zipcode (optional)
 * @returns {Promise<Object>} Vehicle data with all the review information
 */
export async function fetchBrakeBiasData(vehicle) {
  try {
    const response = await fetch('/api/brake-bias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to match what the results page expects
    return {
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      submodel: vehicle.submodel,
      tldr: data.tldr,
      quickStats: {
        engine: data.engine,
        horsepower: extractHorsepower(data.engine),
        drivetrain: data.drivetrain,
        transmission: data.transmission,
      },
      pricing: {
        msrp: data.msrp,
        usedAvg: data.usedAvg,
      },
      reviews: data.reviews || [],
      ownerSentiment: data.ownerSentiment || null,
      market: {
        depreciation: "25", // Mock data for now
        listings: data.autoTempestLink,
      },
    };
  } catch (error) {
    console.error('Error fetching brake bias data:', error);
    throw error;
  }
}

/**
 * Helper function to extract horsepower from engine string
 * @param {string} engineString - Engine description string
 * @returns {string} Horsepower value or "N/A"
 */
function extractHorsepower(engineString) {
  if (!engineString) return "N/A";
  
  // Look for patterns like "300 hp", "300hp", "300 HP"
  const hpMatch = engineString.match(/(\d+)\s*(?:hp|HP|horsepower)/i);
  return hpMatch ? `${hpMatch[1]} HP` : "N/A";
}