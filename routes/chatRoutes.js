import express from 'express';
import { getChats, createChat, sendMessage } from '../controllers/chatController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateUser, getChats);
router.post('/', authenticateUser, createChat);
router.post('/message', authenticateUser, sendMessage);

export default router;
