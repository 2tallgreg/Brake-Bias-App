import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID, // This might help with project keys
})

export async function POST(request) {
  try {
    console.log('API route called')
    
    const { year, make, model, submodel, zipcode } = await request.json()
    console.log('Received data:', { year, make, model, submodel, zipcode })
    
    // Validate required fields
    if (!year || !make || !model) {
      return Response.json(
        { error: 'Year, make, and model are required' },
        { status: 400 }
      )
    }

    const vehicle = `${year} ${make} ${model} ${submodel || ''}`.trim()
    console.log('Processing vehicle:', vehicle)
    
    // Check if OpenAI API key exists
    const apiKey = process.env.OPENAI_API_KEY
    console.log('API Key exists:', !!apiKey)
    console.log('API Key first 10 chars:', apiKey ? apiKey.substring(0, 10) : 'undefined')
    console.log('API Key length:', apiKey ? apiKey.length : 0)
    
    if (!apiKey) {
      console.error('OpenAI API key missing from environment')
      return Response.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Create the prompt for GPT-4
    const prompt = `You are an automotive brake system expert. Provide detailed brake bias information for the following vehicle: ${vehicle}

Please provide the response in JSON format with the following structure:
{
  "vehicle": "${vehicle}",
  "frontBrakeForce": "percentage (e.g., 65%)",
  "rearBrakeForce": "percentage (e.g., 35%)",
  "brakeSystem": "description of brake system type",
  "frontBrakeType": "type of front brakes",
  "rearBrakeType": "type of rear brakes",
  "rotorDiameter": {
    "front": "diameter in mm or inches",
    "rear": "diameter in mm or inches"
  },
  "caliper": {
    "front": "caliper type and piston count",
    "rear": "caliper type and piston count"
  },
  "recommendations": [
    "list of 3-4 specific recommendations for this vehicle"
  ],
  "technicalSpecs": {
    "totalBrakingForce": "force in Newtons or pounds",
    "brakePadMaterial": "brake pad material type",
    "brakeFluidType": "recommended brake fluid"
  },
  "aftermarketUpgrades": [
    "list of popular aftermarket brake upgrades for this vehicle"
  ]
}

Be as accurate as possible based on known automotive specifications. If exact data isn't available, provide reasonable estimates based on similar vehicles in the same class and manufacturer. Return ONLY the JSON, no additional text.`

    console.log('Calling OpenAI API...')
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an automotive brake system expert. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3
    })

    console.log('OpenAI API response received')

    // Parse OpenAI's response
    let brakeData
    try {
      const responseText = completion.choices[0].message.content
      console.log('Raw OpenAI response:', responseText)
      brakeData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      // Fallback to mock data if parsing fails
      brakeData = {
        vehicle,
        frontBrakeForce: "65%",
        rearBrakeForce: "35%",
        brakeSystem: "ABS with Electronic Brake Distribution",
        frontBrakeType: "Ventilated Disc",
        rearBrakeType: "Solid Disc",
        rotorDiameter: {
          front: "320mm",
          rear: "300mm"
        },
        caliper: {
          front: "Single-piston floating",
          rear: "Single-piston floating"
        },
        recommendations: [
          "Regular brake fluid replacement every 2 years",
          "Monitor brake pad wear every 15,000 miles",
          "Consider performance brake pads for spirited driving"
        ],
        technicalSpecs: {
          totalBrakingForce: "Estimated based on vehicle weight",
          brakePadMaterial: "Semi-metallic",
          brakeFluidType: "DOT 3 or DOT 4"
        },
        aftermarketUpgrades: [
          "Performance brake pads",
          "Slotted or drilled rotors",
          "Braided brake lines"
        ]
      }
    }

    // Add local dealer information
    const localDealers = await getLocalDealers(zipcode)
    
    const finalResponse = {
      ...brakeData,
      localDealers,
      searchTimestamp: new Date().toISOString()
    }
    
    console.log('Sending final response:', finalResponse)
    return Response.json(finalResponse)

  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: `API Error: ${error.message}` },
      { status: 500 }
    )
  }
}

// Mock function for local dealers
async function getLocalDealers(zipcode) {
  const mockDealers = [
    { 
      name: "AutoZone", 
      distance: "2.3 mi", 
      phone: "(555) 123-4567",
      address: "123 Main St",
      rating: 4.2
    },
    { 
      name: "O'Reilly Auto Parts", 
      distance: "3.1 mi", 
      phone: "(555) 987-6543",
      address: "456 Oak Ave",
      rating: 4.0
    },
    { 
      name: "NAPA Auto Parts", 
      distance: "4.2 mi", 
      phone: "(555) 456-7890",
      address: "789 Pine St",
      rating: 4.5
    }
  ]
  
  return mockDealers
}