import express from 'express';
import { createRequest, getRequests, getRequest, updateRequest, deleteRequest } from '../controllers/requestController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createRequest);
router.get('/', authenticateUser, getRequests);
router.get('/:id', authenticateUser, getRequest);
router.put('/:id', authenticateUser, updateRequest);
router.delete('/:id', authenticateUser, deleteRequest);

export default router;
