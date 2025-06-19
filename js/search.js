// js/search.js
import { vehicleDatabase } from "@/lib/constants"; // Assuming this is where the static vehicle data is

/**
 * Generates an array of years for the search dropdown.
 * @returns {number[]} An array of years from the current year down to 1980.
 */
export function getYearOptions() {
  const currentYear = new Date().getFullYear() + 1;
  const years = [];
  for (let year = currentYear; year >= 1980; year--) {
    years.push(year);
  }
  return years;
}

/**
 * Gets a sorted list of all available vehicle makes.
 * @returns {string[]} A sorted array of vehicle makes.
 */
export function getMakeOptions() {
  return Object.keys(vehicleDatabase).sort();
}

/**
 * Gets the models for a specific make from the local database.
 * @param {string} make - The selected vehicle make.
 * @returns {string[]} An array of model names for the given make.
 */
export function getModelOptionsForMake(make) {
  if (make && vehicleDatabase[make]) {
    return vehicleDatabase[make];
  }
  return [];
}