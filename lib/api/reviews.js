// lib/api/reviews.js

/**
 * Fetches a mock list of professional reviews for a vehicle.
 * @param {string} vehicleName - The full name of the vehicle.
 * @returns {Promise<object[]>} - A promise resolving to an array of review objects.
 */
export async function getProfessionalReviews(vehicleName) {
  // In a real application, this would use a search API or scraper.
  console.log(`Fetching professional reviews for ${vehicleName}...`);

  // Mock data for demonstration
  return [
    {
      source: "MotorTrend",
      sentiment: "Positive",
      text: "Offers a compelling blend of performance and comfort, setting a high bar for the segment.",
      link: "#",
      review_year: parseInt(new Date().getFullYear()),
      disclaimer: null,
    },
    {
      source: "Car and Driver",
      sentiment: "Neutral",
      text: "While competent, it fails to excite and the interior materials feel a step behind rivals.",
      link: "#",
      review_year: parseInt(new Date().getFullYear()),
      disclaimer: null,
    },
  ];
}