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

To install new dependencies, run:

bash
npm install express-rate-limit winston

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `NODE_ENV`: Set to 'development', 'test', or 'production'
- `PORT`: The port number for the server (default: 3000)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key

## CI/CD

This project uses GitHub Actions for continuous integration and deployment. The workflow is defined in `.github/workflows/main.yml`. It runs on pushes to the main branch and pull requests, performing the following steps:

1. Checkout the code
2. Set up Node.js
3. Install dependencies
4. Build the project
5. Run tests

To deploy changes to production, simply push to the main branch on GitHub.

