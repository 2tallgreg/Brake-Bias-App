// lib/api/specs.js

/**
 * Fetches mock technical specifications for a given vehicle.
 * @param {string} vehicleName - The full name of the vehicle.
 * @returns {Promise<object>} - A promise resolving to an object with vehicle specs.
 */
export async function getVehicleSpecs(vehicleName) {
    console.log(`Fetching specs for ${vehicleName}...`);

    // Mock data for demonstration
    const hp = Math.floor(Math.random() * (450 - 150 + 1) + 150);
    const torque = Math.floor(hp * 1.1);

    return {
        drivetrain: Math.random() > 0.4 ? "AWD" : "FWD",
        engine: "2.5L 4-Cylinder Turbo",
        transmission: "8-Speed Automatic",
        horsepower: `${hp} hp`,
        torque: `${torque} lb-ft`,
    };
}