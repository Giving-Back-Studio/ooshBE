import express from 'express';
import { createInteraction, getInteractions } from '../controllers/interactionController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createInteraction);
router.get('/', authenticateUser, getInteractions);

export default router;
