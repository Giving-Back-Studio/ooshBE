const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, profileController.createProfile);
router.get('/', authenticateUser, profileController.getProfile);
router.put('/', authenticateUser, profileController.updateProfile);
router.delete('/', authenticateUser, profileController.deleteProfile);

module.exports = router;
