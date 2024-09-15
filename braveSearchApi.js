import axios from 'axios';

const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

export const searchPermacultureFarms = async (query) => {
  if (!BRAVE_API_KEY) {
    throw new Error('BRAVE_API_KEY is not set');
  }

  try {
    const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
      params: {
        q: `permaculture farms ${query}`,
        count: 10,
      },
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': BRAVE_API_KEY,
      },
    });

    if (!response.data || !response.data.web || !response.data.web.results) {
      throw new Error('Invalid response from Brave Search API');
    }

    return response.data.web.results;
  } catch (error) {
    console.error('Error searching Brave:', error.message);
    throw new Error('Failed to search for permaculture farms');
  }
};
