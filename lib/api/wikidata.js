// lib/api/wikidata.js

// This is the public endpoint for the Wikidata Query Service.
const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql';

/**
 * Fetches vehicle specifications from Wikidata.
 * @param {string} make The make of the vehicle (e.g., "Honda").
 * @param {string} model The model of the vehicle (e.g., "Civic").
 * @param {string} year The model year of the vehicle.
 * @returns {Promise<object|null>} A promise that resolves to an object with vehicle specs or null if not found.
 */
export async function getSpecsFromWikidata(make, model, year) {
  // We search for a vehicle model that contains the make, model, and year in its name.
  // This is a more flexible search than requiring an exact match.
  const searchQuery = `${make} ${model} ${year}`;

  // SPARQL is the query language for databases like Wikidata.
  // This query looks for an item that is an instance of 'automobile model' (Q2442379)
  // and has a label containing our search query.
  // It then optionally fetches various properties we're interested in.
  const sparqlQuery = `
    SELECT ?itemLabel ?mfrLabel ?drivetrainLabel ?engineLabel ?hp ?torque ?width ?length ?height ?wheelbase ?weight WHERE {
      SERVICE wikibase:mwapi {
        bd:serviceParam wikibase:api "EntitySearch" .
        bd:serviceParam wikibase:endpoint "www.wikidata.org" .
        bd:serviceParam wikibase:limit 1 .
        bd:serviceParam schema:search "${searchQuery}" .
        ?item wikibase:apiOutputItem mwapi:item .
      }

      ?item wdt:P31 wd:Q2442379; # Instance of automobile model
            rdfs:label ?itemLabel.
      FILTER(LANG(?itemLabel) = "en").
      FILTER(CONTAINS(LCASE(?itemLabel), LCASE("${model}"))).
      
      OPTIONAL { ?item wdt:P176 ?mfr. ?mfr rdfs:label ?mfrLabel. FILTER(LANG(?mfrLabel) = "en"). } # Manufacturer
      OPTIONAL { ?item wdt:P405 ?drivetrain. ?drivetrain rdfs:label ?drivetrainLabel. FILTER(LANG(?drivetrainLabel) = "en"). } # Drivetrain
      OPTIONAL { ?item wdt:P1015 ?engine. ?engine rdfs:label ?engineLabel. FILTER(LANG(?engineLabel) = "en"). } # Engine
      OPTIONAL { ?item wdt:P2043 ?hp. } # Horsepower
      OPTIONAL { ?item wdt:P2059 ?torque. } # Torque
      OPTIONAL { ?item wdt:P2049 ?width. } # Width
      OPTIONAL { ?item wdt:P2043 ?length. } # Length
      OPTIONAL { ?item wdt:P2048 ?height. } # Height
      OPTIONAL { ?item wdt:P2053 ?wheelbase. } # Wheelbase
      OPTIONAL { ?item wdt:P2067 ?weight. } # Curb weight
    }
    LIMIT 1
  `;

  try {
    const response = await fetch(`${WIKIDATA_ENDPOINT}?query=${encodeURIComponent(sparqlQuery)}`, {
      headers: {
        'Accept': 'application/sparql-results+json'
      }
    });

    if (!response.ok) {
      console.error("Wikidata request failed with status:", response.status);
      return null;
    }

    const data = await response.json();
    const bindings = data.results.bindings;

    if (bindings.length === 0) {
      console.log("No results found on Wikidata for:", searchQuery);
      return null;
    }

    const result = bindings[0];
    const parsedData = {
      manufacturer: result.mfrLabel?.value,
      engine: result.engineLabel?.value,
      drivetrain: result.drivetrainLabel?.value,
      horsepower: result.hp?.value,
      torque: result.torque?.value,
      dimensions: {
        width_mm: result.width?.value,
        length_mm: result.length?.value,
        height_mm: result.height?.value,
        wheelbase_mm: result.wheelbase?.value,
      },
      weight_kg: result.weight?.value
    };

    // Clean up any fields that weren't found
    const cleanedData = Object.fromEntries(Object.entries(parsedData).filter(([_, v]) => v != null));

    // If we only got a few fields, it's not worth using.
    // This threshold can be adjusted.
    if (Object.keys(cleanedData).length < 3) {
      console.log("Wikidata result was too sparse, falling back to AI.");
      return null;
    }


    console.log("Successfully fetched specs from Wikidata.");
    return cleanedData;

  } catch (error) {
    console.error("Error querying Wikidata:", error);
    return null;
  }
}