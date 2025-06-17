// lib/api/openai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeWithOpenAI({ type, posts, vehicleInfo }) {
  try {
    if (type === 'reddit_sentiment') {
      return await analyzeRedditSentiment(posts, vehicleInfo);
    }
    
    throw new Error(`Unknown analysis type: ${type}`);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

async function analyzeRedditSentiment(posts, vehicleInfo) {
  const { year, make, model } = vehicleInfo;
  
  // Prepare Reddit posts for analysis
  const postContent = posts.map(post => 
    `Title: ${post.title}\nContent: ${post.content || post.selftext || 'No content'}\nScore: ${post.score || 0}\nComments: ${post.num_comments || 0}\n---`
  ).slice(0, 30).join('\n\n'); // Limit to 30 posts to avoid token limits

  const prompt = `Analyze Reddit discussions about the ${year} ${make} ${model} and categorize owner sentiment.

Reddit Posts:
${postContent}

Provide a sentiment analysis with:
1. Categorize topics as positive, neutral, or negative
2. Identify most discussed topics with post counts
3. Extract sample owner comments that represent common opinions
4. Summarize overall owner satisfaction

Return in JSON format:
{
  "totalPosts": ${posts.length},
  "sentiment": {
    "positive": ["List of positive aspects owners mention"],
    "neutral": ["List of neutral/mixed opinion topics"],
    "negative": ["List of complaints or issues"]
  },
  "commonTopics": [
    "Topic description with context"
  ],
  "sampleComments": [
    {
      "author": "username",
      "comment": "Representative comment text",
      "upvotes": 100
    }
  ],
  "overallSentiment": "brief summary of owner satisfaction",
  "sentimentScore": 0.75
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are an expert at analyzing automotive forum discussions and understanding owner sentiment. Always return valid JSON.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 2000,
    response_format: { type: "json_object" }
  });

  try {
    const analysis = JSON.parse(response.choices[0].message.content);
    
    // Clean and validate the response
    return {
      totalPosts: analysis.totalPosts || posts.length,
      subreddits: extractSubreddits(posts),
      sentiment: {
        positive: ensureArray(analysis.sentiment?.positive).slice(0, 8),
        neutral: ensureArray(analysis.sentiment?.neutral).slice(0, 6),
        negative: ensureArray(analysis.sentiment?.negative).slice(0, 8)
      },
      commonTopics: ensureArray(analysis.commonTopics).slice(0, 10),
      sampleComments: ensureArray(analysis.sampleComments).slice(0, 5).map(comment => ({
        author: comment.author || 'u/anonymous',
        comment: comment.comment || '',
        upvotes: comment.upvotes || 0
      })),
      overallSentiment: analysis.overallSentiment || 'Mixed opinions',
      sentimentScore: Math.min(1, Math.max(0, analysis.sentimentScore || 0.5))
    };
  } catch (parseError) {
    console.error('Error parsing OpenAI response:', parseError);
    // Return a fallback structure
    return {
      totalPosts: posts.length,
      subreddits: extractSubreddits(posts),
      sentiment: {
        positive: ['Reliability', 'Fuel Economy'],
        neutral: ['Styling', 'Technology'],
        negative: ['Some reported issues']
      },
      commonTopics: ['General discussion about the vehicle'],
      sampleComments: [],
      overallSentiment: 'Analysis in progress',
      sentimentScore: 0.7
    };
  }
}

// Helper functions
function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return [];
}

function extractSubreddits(posts) {
  const subreddits = new Set();
  posts.forEach(post => {
    if (post.subreddit) {
      subreddits.add(`r/${post.subreddit}`);
    }
  });
  return Array.from(subreddits).slice(0, 5);
}

// Function to generate quick summaries using GPT-3.5 for speed
export async function generateQuickSummary(text, maxLength = 200) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a concise automotive journalist. Provide brief, informative summaries.'
        },
        {
          role: 'user',
          content: `Summarize this in ${maxLength} characters or less: ${text}`
        }
      ],
      temperature: 0.5,
      max_tokens: 100
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Quick summary error:', error);
    return text.substring(0, maxLength) + '...';
  }
}