// lib/helpers.js

/**
 * Cleans and sanitizes text by removing excessive whitespace and newlines.
 * @param {string} inputText - The string to clean.
 * @returns {string} The cleaned string.
 */
export function sanitizeText(inputText) {
  if (!inputText) return "";
  return inputText.replace(/\s\s+/g, ' ').replace(/\n+/g, ' ').trim();
}

/**
 * Extracts a JSON object from a string that may contain other text.
 * Useful for parsing responses from AI models that are not perfectly formatted.
 * @param {string} text - The text containing a JSON object.
 * @returns {object | null} The parsed JSON object or null if not found.
 */
export function extractJsonObject(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("Failed to parse extracted JSON.", e);
      return null;
    }
  }
  return null;
}

/**
 * A simple delay function using Promises.
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}