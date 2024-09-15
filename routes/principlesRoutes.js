import express from 'express';
import { getPrinciples, createPrinciple } from '../controllers/principlesController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateUser, getPrinciples);
router.post('/', authenticateUser, createPrinciple);

export default router;
