require('dotenv').config();
const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/' + (process.env.NODE_ENV || 'development'));

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // MongoDB connection
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('Could not connect to MongoDB', err);
      process.exit(1);
    });

  // Routes
  const authRoutes = require('./routes/authRoutes');
  const chatRoutes = require('./routes/chatRoutes');
  const principlesRoutes = require('./routes/principlesRoutes');

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/principles', principlesRoutes);

  // Handle all other routes with Next.js
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Start the server
  const PORT = config.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;


