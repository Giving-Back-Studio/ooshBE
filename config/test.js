module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/permaculture_chatbot_test',
  JWT_SECRET: process.env.JWT_SECRET || 'test_jwt_secret'
};
