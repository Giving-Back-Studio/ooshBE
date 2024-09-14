const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/', authenticateUser, recommendationController.getRecommendations);

module.exports = router;
