// js/api.js

/**
 * Fetches the main vehicle analysis data from the brake-bias API.
 * @param {object} vehicle - The vehicle details { year, make, model, submodel, zipcode }.
 * @returns {Promise<object>} A promise that resolves to the vehicle data JSON.
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

    return await response.json();
  } catch (error) {
    console.error('Error fetching brake bias data:', error);
    // Re-throw the error so the calling component can handle it
    throw error;
  }
}

/**
 * Fetches a list of models for a given make and year.
 * @param {string} year - The vehicle year.
 * @param {string} make - The vehicle make.
 * @returns {Promise<string[]>} A promise that resolves to an array of model names.
 */
export async function fetchVehicleModels(year, make) {
  try {
    const response = await fetch('/api/vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year, make, type: 'models' }),
    });

    if (!response.ok) {
      return []; // Return an empty array on failure to prevent crashes
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    return [];
  }
}