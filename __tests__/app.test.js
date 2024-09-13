const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

describe('API Endpoints', () => {
  it('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  // Add more tests for your API endpoints
});
