require('dotenv').config();
const express = require('express');
const next = require('next');
const cors = require('cors');
const config = require('./config/' + (process.env.NODE_ENV || 'development'));
const supabase = require('./supabaseClient');
const { authenticateUser } = require('./middleware/authMiddleware');
const rateLimit = require('express-rate-limit');
const logger = require('./logger');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Make supabase client available to all routes
  app.use((req, res, next) => {
    req.supabase = supabase;
    next();
  });

  // Rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

  // Apply rate limiting to API routes
  app.use('/api', apiLimiter);

  // Routes
  const authRoutes = require('./routes/authRoutes');
  const chatRoutes = require('./routes/chatRoutes');
  const principlesRoutes = require('./routes/principlesRoutes');
  const userRoutes = require('./routes/userRoutes');
  const interactionRoutes = require('./routes/interactionRoutes');
  const recommendationRoutes = require('./routes/recommendationRoutes');

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/chat', authenticateUser, chatRoutes);
  app.use('/api/principles', authenticateUser, principlesRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/interactions', interactionRoutes);
  app.use('/api/recommendations', recommendationRoutes);

  // Handle all other routes with Next.js
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
  });

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Add CORS options handling
  app.options('*', cors());
});

module.exports = app;


