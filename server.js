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
  
  // CORS configuration
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

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
  const opportunityRoutes = require('./routes/opportunityRoutes');
  const requestRoutes = require('./routes/requestRoutes');
  const farmEnterpriseRoutes = require('./routes/farmEnterpriseRoutes');
  const profileRoutes = require('./routes/profileRoutes');

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/chat', authenticateUser, chatRoutes);
  app.use('/api/principles', authenticateUser, principlesRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/interactions', interactionRoutes);
  app.use('/api/recommendations', recommendationRoutes);
  app.use('/api/opportunities', opportunityRoutes);
  app.use('/api/requests', requestRoutes);
  app.use('/api/farm-enterprises', farmEnterpriseRoutes);
  app.use('/api/profiles', profileRoutes);

  // Add a test route
  app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
  });

  // Add a new route for searching farms
  const { searchPermacultureFarms } = require('./braveSearchApi');

  app.get('/search-farms', async (req, res) => {
    const { query, store } = req.query;
    
    try {
      const farms = await searchPermacultureFarms(query);
      const farmData = farms.map(result => ({
        name: result.title,
        description: result.description,
        website: result.url,
        location: result.extra_snippets?.find(snippet => snippet.key === 'Location')?.value || 'Unknown',
        facebook: result.extra_snippets?.find(snippet => snippet.key === 'Facebook')?.value || null,
        instagram: result.extra_snippets?.find(snippet => snippet.key === 'Instagram')?.value || null,
        x: result.extra_snippets?.find(snippet => snippet.key === 'Twitter')?.value || null,
        contactEmails: result.extra_snippets?.find(snippet => snippet.key === 'Email')?.value?.split(',') || []
      }));

      if (store === 'true') {
        await insertFarmData(farmData);
      }

      res.json(farmData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  async function insertFarmData(farmData) {
    try {
      const { data, error } = await supabase
        .from('farms')
        .upsert(farmData, { onConflict: 'name' });

      if (error) throw error;
      console.log('Farm data inserted successfully:', data);
    } catch (error) {
      console.error('Error inserting farm data:', error);
      throw error;
    }
  }

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


