const axios = require('axios');
require('dotenv').config();

const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
const BRAVE_API_URL = 'https://api.search.brave.com/res/v1/web/search';

async function searchPermacultureFarms(query) {
  try {
    const response = await axios.get(BRAVE_API_URL, {
      params: {
        q: query,
        format: 'json',
      },
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': BRAVE_API_KEY,
      },
    });

    return response.data.web.results;
  } catch (error) {
    console.error('Error searching Brave API:', error);
    throw error;
  }
}

module.exports = { searchPermacultureFarms };
