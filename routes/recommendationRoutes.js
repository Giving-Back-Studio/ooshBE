import express from 'express';
import { getRecommendations } from '../controllers/recommendationController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateUser, getRecommendations);

export default router;
