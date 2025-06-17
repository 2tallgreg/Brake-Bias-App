// lib/api/claude.js
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeWithClaude({ type, reviews, vehicleInfo }) {
  try {
    if (type === 'professional_reviews') {
      return await analyzeProfessionalReviews(reviews, vehicleInfo);
    }
    
    throw new Error(`Unknown analysis type: ${type}`);
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}

async function analyzeProfessionalReviews(reviews, vehicleInfo) {
  const { year, make, model } = vehicleInfo;
  
  // Prepare the review content for Claude
  const reviewContent = reviews.map(review => 
    `Source: ${review.source}\nURL: ${review.url}\nContent: ${review.content}\n---`
  ).join('\n\n');

  const prompt = `You are an automotive expert analyzing professional reviews for the ${year} ${make} ${model}.

Please analyze the following professional reviews and provide:
1. Extract key quotes/snippets (2-3 sentences max) from each review
2. Identify specific pros and cons mentioned
3. Determine a rating out of 5 stars for each review based on sentiment
4. Create an overall summary of professional consensus
5. Extract any mentioned competitors

Reviews to analyze:
${reviewContent}

Return your analysis in this exact JSON format:
{
  "reviews": [
    {
      "source": "Source Name",
      "url": "URL",
      "snippet": "Key quote from review",
      "rating": 4.5,
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"],
      "verdict": "One sentence verdict"
    }
  ],
  "summary": {
    "consensus": "Overall professional consensus in 2-3 sentences",
    "averageRating": 4.3,
    "commonPros": ["Most mentioned pros"],
    "commonCons": ["Most mentioned cons"],
    "competitors": ["Mentioned competing vehicles"]
  }
}`;

  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 2000,
    temperature: 0.3,
    system: "You are an expert automotive journalist with deep knowledge of car reviews. Always return valid JSON.",
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  try {
    // Extract JSON from Claude's response
    const jsonMatch = response.content[0].text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in Claude response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    
    // Validate and clean the response
    return {
      reviews: analysis.reviews.map(review => ({
        source: review.source || 'Unknown',
        url: review.url || '#',
        snippet: review.snippet || 'No snippet available',
        rating: Math.min(5, Math.max(0, review.rating || 0)),
        pros: Array.isArray(review.pros) ? review.pros.slice(0, 5) : [],
        cons: Array.isArray(review.cons) ? review.cons.slice(0, 5) : [],
        verdict: review.verdict || ''
      })),
      summary: {
        consensus: analysis.summary?.consensus || 'No consensus available',
        averageRating: analysis.summary?.averageRating || 0,
        commonPros: analysis.summary?.commonPros || [],
        commonCons: analysis.summary?.commonCons || [],
        competitors: analysis.summary?.competitors || []
      }
    };
  } catch (parseError) {
    console.error('Error parsing Claude response:', parseError);
    // Return a fallback structure
    return {
      reviews: reviews.map(review => ({
        source: review.source,
        url: review.url,
        snippet: review.content.substring(0, 200) + '...',
        rating: 4,
        pros: ['Information available in full review'],
        cons: ['See full review for details'],
        verdict: 'Review analysis pending'
      })),
      summary: {
        consensus: 'Review analysis is being processed',
        averageRating: 4,
        commonPros: [],
        commonCons: [],
        competitors: []
      }
    };
  }
}

// Helper function to extract rating from text
export function extractRatingFromText(text) {
  // Look for patterns like "4/5", "4 out of 5", "8/10", etc.
  const patterns = [
    /(\d+(?:\.\d+)?)\s*(?:out of|\/)\s*5/i,
    /(\d+(?:\.\d+)?)\s*(?:out of|\/)\s*10/i,
    /(\d+(?:\.\d+)?)\s*stars?/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const rating = parseFloat(match[1]);
      if (pattern.toString().includes('10')) {
        return rating / 2; // Convert 10-point scale to 5-point
      }
      return Math.min(5, rating);
    }
  }
  
  return null;
}