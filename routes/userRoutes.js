const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, userController.createUser);
router.get('/:user_id', authenticateUser, userController.getUser);
router.put('/:user_id', authenticateUser, userController.updateUser);

module.exports = router;
