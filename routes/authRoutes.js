const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { body } = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], authController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], authController.login);

router.post('/logout', authMiddleware, authController.logout);

router.get('/user', authMiddleware, authController.getUser);

module.exports = router;
