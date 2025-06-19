// lib/api/specs.js

/**
 * Fetches mock technical specifications for a given vehicle.
 * @param {string} year - The vehicle year.
 * @param {string} make - The vehicle make.
 * @param {string} model - The vehicle model.
 * @returns {Promise<object>} - A promise resolving to an object with vehicle specs.
 */
export async function fetchSpecs(year, make, model) {
    console.log(`Fetching specs for ${year} ${make} ${model}...`);

    // Mock data for demonstration
    const hp = Math.floor(Math.random() * (450 - 150 + 1) + 150);
    const torque = Math.floor(hp * 1.1);

    return {
        drivetrain: Math.random() > 0.4 ? "AWD" : "FWD",
        engine: "2.5L 4-Cylinder",
        transmission: "8-Speed Automatic",
        horsepower: `${hp} hp`,
        torque: `${torque} lb-ft`,
    };
}