// lib/api/reddit.js
export async function fetchRedditSentiment({ year, make, model, limit = 100 }) {
  try {
    // Get Reddit access token
    const token = await getRedditAccessToken();
    
    // Search multiple subreddits for comprehensive coverage
    const subreddits = ['cars', 'whatcarshouldIbuy', make.toLowerCase()];
    const searchQueries = [
      `${year} ${make} ${model}`,
      `${make} ${model} review`,
      `${make} ${model} owner`
    ];
    
    const allPosts = [];
    
    // Search each subreddit with each query
    for (const subreddit of subreddits) {
      for (const query of searchQueries) {
        try {
          const posts = await searchReddit(token, query, subreddit, Math.ceil(limit / (subreddits.length * searchQueries.length)));
          allPosts.push(...posts);
        } catch (err) {
          console.error(`Error searching r/${subreddit} for "${query}":`, err);
        }
      }
    }
    
    // Remove duplicates and filter relevant posts
    const uniquePosts = removeDuplicatePosts(allPosts);
    const relevantPosts = filterRelevantPosts(uniquePosts, { year, make, model });
    
    // Sort by relevance and engagement
    const sortedPosts = relevantPosts.sort((a, b) => {
      const scoreA = a.score + (a.num_comments * 2);
      const scoreB = b.score + (b.num_comments * 2);
      return scoreB - scoreA;
    });
    
    return sortedPosts.slice(0, limit);
  } catch (error) {
    console.error('Reddit API Error:', error);
    throw error;
  }
}

async function getRedditAccessToken() {
  const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': process.env.REDDIT_USER_AGENT || 'BrakeBias/1.0.0'
    },
    body: 'grant_type=client_credentials'
  });
  
  if (!response.ok) {
    throw new Error('Failed to get Reddit access token');
  }
  
  const data = await response.json();
  return data.access_token;
}

async function searchReddit(token, query, subreddit, limit = 25) {
  const params = new URLSearchParams({
    q: query,
    restrict_sr: 'true',
    sort: 'relevance',
    t: 'all',
    limit: limit.toString()
  });
  
  const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/search?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': process.env.REDDIT_USER_AGENT || 'BrakeBias/1.0.0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Reddit search failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data.children.map(child => ({
    ...child.data,
    subreddit: child.data.subreddit
  }));
}

function removeDuplicatePosts(posts) {
  const seen = new Set();
  return posts.filter(post => {
    if (seen.has(post.id)) {
      return false;
    }
    seen.add(post.id);
    return true;
  });
}

function filterRelevantPosts(posts, { year, make, model }) {
  return posts.filter(post => {
    const title = post.title.toLowerCase();
    const text = (post.selftext || '').toLowerCase();
    const combined = title + ' ' + text;
    
    // Must mention the make and model
    if (!combined.includes(make.toLowerCase()) || !combined.includes(model.toLowerCase())) {
      return false;
    }
    
    // Prefer posts that mention the year
    if (year && combined.includes(year.toString())) {
      post.relevanceScore = (post.relevanceScore || 0) + 10;
    }
    
    // Boost posts with keywords
    const keywords = ['review', 'owner', 'bought', 'driving', 'miles', 'problems', 'love', 'hate', 'reliable', 'issue'];
    keywords.forEach(keyword => {
      if (combined.includes(keyword)) {
        post.relevanceScore = (post.relevanceScore || 0) + 1;
      }
    });
    
    return true;
  });
}

// Extract most discussed topics from Reddit posts
export function extractRedditTopics(posts) {
  const topics = {};
  const keywords = {
    reliability: ['reliable', 'reliability', 'dependable', 'breaks', 'broken', 'repair', 'maintenance'],
    performance: ['fast', 'slow', 'acceleration', 'speed', 'power', 'horsepower', 'torque'],
    comfort: ['comfortable', 'comfort', 'seats', 'ride', 'smooth', 'rough', 'quiet', 'noise'],
    fuel: ['mpg', 'gas', 'fuel', 'economy', 'mileage', 'efficient'],
    value: ['price', 'cost', 'expensive', 'cheap', 'worth', 'value', 'money'],
    tech: ['infotainment', 'screen', 'carplay', 'android', 'bluetooth', 'tech', 'features'],
    space: ['space', 'roomy', 'cramped', 'cargo', 'trunk', 'storage', 'spacious'],
    styling: ['looks', 'style', 'design', 'ugly', 'beautiful', 'appearance', 'exterior']
  };
  
  posts.forEach(post => {
    const text = (post.title + ' ' + (post.selftext || '')).toLowerCase();
    
    Object.entries(keywords).forEach(([topic, words]) => {
      words.forEach(word => {
        if (text.includes(word)) {
          topics[topic] = (topics[topic] || 0) + 1;
        }
      });
    });
  });
  
  // Sort by frequency and return top topics
  return Object.entries(topics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([topic, count]) => ({
      topic: topic.charAt(0).toUpperCase() + topic.slice(1),
      count
    }));
}

// Analyze sentiment from Reddit posts
export function analyzeRedditSentiment(posts) {
  const sentiments = {
    positive: [],
    neutral: [],
    negative: []
  };
  
  const positiveWords = ['love', 'great', 'excellent', 'amazing', 'perfect', 'reliable', 'comfortable', 'smooth', 'quiet', 'efficient', 'practical', 'solid', 'recommended'];
  const negativeWords = ['hate', 'terrible', 'awful', 'unreliable', 'broken', 'expensive', 'uncomfortable', 'loud', 'problems', 'issues', 'regret', 'disappointed'];
  
  posts.forEach(post => {
    const text = (post.title + ' ' + (post.selftext || '')).toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;
    
    positiveWords.forEach(word => {
      if (text.includes(word)) positiveScore++;
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) negativeScore++;
    });
    
    // Categorize based on score
    if (positiveScore > negativeScore + 1) {
      sentiments.positive.push(post);
    } else if (negativeScore > positiveScore + 1) {
      sentiments.negative.push(post);
    } else {
      sentiments.neutral.push(post);
    }
  });
  
  return sentiments;
}