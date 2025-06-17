// lib/constants.js
export const vehicleDatabase = {
  'Acura': ['ILX', 'TLX', 'RDX', 'MDX', 'NSX', 'Integra'],
  'Audi': ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'RS3', 'RS5', 'R8'],
  'BMW': ['2 Series', '3 Series', '4 Series', '5 Series', '7 Series', '8 Series', 'X1', 'X3', 'X5', 'X7', 'M3', 'M5', 'Z4'],
  'Buick': ['Enclave', 'Encore', 'Envision'],
  'Cadillac': ['CT4', 'CT5', 'XT4', 'XT5', 'XT6', 'Escalade', 'Lyriq'],
  'Chevrolet': ['Spark', 'Malibu', 'Camaro', 'Corvette', 'Trax', 'Equinox', 'Blazer', 'Traverse', 'Tahoe', 'Suburban', 'Colorado', 'Silverado'],
  'Chrysler': ['300', 'Pacifica', 'Voyager'],
  'Dodge': ['Charger', 'Challenger', 'Durango', 'Hornet'],
  'Ford': ['Mustang', 'Escape', 'Edge', 'Explorer', 'Expedition', 'Bronco', 'Ranger', 'F-150', 'Maverick'],
  'Genesis': ['G70', 'G80', 'G90', 'GV70', 'GV80'],
  'GMC': ['Terrain', 'Acadia', 'Yukon', 'Canyon', 'Sierra'],
  'Honda': ['Civic', 'Accord', 'HR-V', 'CR-V', 'Passport', 'Pilot', 'Ridgeline', 'Odyssey'],
  'Hyundai': ['Accent', 'Elantra', 'Sonata', 'Venue', 'Kona', 'Tucson', 'Santa Fe', 'Palisade'],
  'Infiniti': ['Q50', 'Q60', 'QX50', 'QX60', 'QX80'],
  'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator'],
  'Kia': ['Rio', 'Forte', 'K5', 'Stinger', 'Soul', 'Seltos', 'Sportage', 'Sorento', 'Telluride', 'Carnival'],
  'Lexus': ['IS', 'ES', 'LS', 'RC', 'LC', 'UX', 'NX', 'RX', 'GX', 'LX'],
  'Lincoln': ['Corsair', 'Nautilus', 'Aviator', 'Navigator'],
  'Mazda': ['Mazda3', 'CX-30', 'CX-5', 'CX-50', 'CX-9', 'MX-5 Miata'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class'],
  'Mini': ['Hardtop', 'Convertible', 'Clubman', 'Countryman'],
  'Mitsubishi': ['Mirage', 'Eclipse Cross', 'Outlander'],
  'Nissan': ['Versa', 'Sentra', 'Altima', 'Maxima', 'Kicks', 'Rogue', 'Murano', 'Pathfinder', 'Armada', 'Frontier', 'Titan', 'Z'],
  'Porsche': ['718 Cayman', '718 Boxster', '911', 'Panamera', 'Taycan', 'Macan', 'Cayenne'],
  'Ram': ['1500', '2500', '3500', 'ProMaster'],
  'Subaru': ['Impreza', 'Legacy', 'WRX', 'BRZ', 'Crosstrek', 'Forester', 'Outback', 'Ascent'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
  'Toyota': ['Corolla', 'Camry', 'Avalon', 'Prius', 'Supra', 'C-HR', 'RAV4', 'Highlander', '4Runner', 'Sequoia', 'Tacoma', 'Tundra'],
  'Volkswagen': ['Jetta', 'Passat', 'Golf GTI', 'Tiguan', 'Atlas', 'ID.4'],
  'Volvo': ['S60', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC90']
};

export const API_ENDPOINTS = {
  vehicleSpecs: '/api/vehicle/specs',
  professionalReviews: '/api/reviews/professional',
  redditSentiment: '/api/reviews/reddit',
  marketPricing: '/api/pricing/market',
  vehicleImages: '/api/vehicle/images'
};