// js/api.js

/**
 * Fetches the main vehicle analysis data from the active API endpoint.
 * @param {object} vehicle - The vehicle details { year, make, model, submodel, zipcode }.
 * @returns {Promise<object>} A promise that resolves to the vehicle data JSON.
 */
export async function fetchBrakeBiasData(vehicle) {
  try {
    // Using the Gemini endpoint as primary
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