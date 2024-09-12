require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/' + (process.env.NODE_ENV || 'development'));

const app = express();

app.use(express.json());

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Permaculture AI Chatbot API' });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log();
});

module.exports = app;
