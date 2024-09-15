import express from 'express';
import { createOpportunity, getOpportunities, getOpportunity } from '../controllers/opportunityController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createOpportunity);
router.get('/', authenticateUser, getOpportunities);
router.get('/:id', authenticateUser, getOpportunity);

export default router;
