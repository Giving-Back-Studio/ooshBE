# Permaculture AI Chatbot

This project is a full-stack Next.js application with an Express backend for a Permaculture AI Chatbot.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file
4. Run the development server: `npm run dev`

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm test`: Run tests

## Deployment

1. Build the Docker image: `docker build -t permaculture-ai-chatbot .`
2. Run the Docker container: `docker run -p 3000:3000 permaculture-ai-chatbot`

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Latest Updates

- Added input validation for user signup and login
- Implemented rate limiting for API routes
- Enhanced error handling and logging
- Set up CI/CD pipeline with GitHub Actions

### New Dependencies

- express-rate-limit: For API rate limiting
- winston: For improved logging

## Frontend Configuration

When developing locally, create a `.env` file in your frontend project root with the following content:

```
REACT_APP_API_BASE_URL=http://localhost:3000
```

For production, set the environment variable to your deployed backend URL:

```
REACT_APP_API_BASE_URL=https://sea-turtle-app-4in2t.ondigitalocean.app
```

Update all API calls in your frontend code to use this base URL:

```javascript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Use this base URL for all API calls
const response = await fetch(${API_BASE_URL}/api/auth/login, {
// ... rest of your fetch options
});
```

This configuration allows your frontend to work with both local and production backends.

