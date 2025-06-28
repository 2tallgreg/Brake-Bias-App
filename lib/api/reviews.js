// lib/api/reviews.js

/**
 * Generates a Google search link for a given review source and vehicle.
 * @param {string} source - The name of the review publication (e.g., "MotorTrend").
 * @param {string} vehicle - The full name of the vehicle.
 * @returns {string} A URL to a Google search.
 */
const generateSearchLink = (source, vehicle) => {
  return `https://www.google.com/search?q=${encodeURIComponent(`${source} ${vehicle} review`)}`;
};

/**
 * Fetches a mock list of professional reviews for a vehicle.
 * @param {string} vehicleName - The full name of the vehicle.
 * @returns {Promise<object[]>} - A promise resolving to an array of review objects.
 */
export async function getProfessionalReviews(vehicleName) {
  console.log(`Fetching professional reviews for ${vehicleName}...`);

  // Mock data for demonstration, now with dynamic search links
  return [
    {
      source: "MotorTrend",
      sentiment: "Positive",
      text: "Offers a compelling blend of performance and comfort, setting a high bar for the segment.",
      link: generateSearchLink("MotorTrend", vehicleName),
      review_year: parseInt(new Date().getFullYear()),
      disclaimer: null,
      keywords: {
        positive: ["performance", "comfort", "handling"],
        negative: []
      }
    },
    {
      source: "Car and Driver",
      sentiment: "Mixed",
      text: "While competent, it fails to excite and the interior materials feel a step behind rivals.",
      link: generateSearchLink("Car and Driver", vehicleName),
      review_year: parseInt(new Date().getFullYear()),
      disclaimer: null,
      keywords: {
        positive: ["competent ride"],
        negative: ["lacks excitement", "interior materials", "road noise"]
      }
    },
  ];
}