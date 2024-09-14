const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, interactionController.logInteraction);
router.get('/:user_id', authenticateUser, interactionController.getUserInteractions);

module.exports = router;
