import express from 'express';
import { createProfile, getProfile, updateProfile, deleteProfile } from '../controllers/profileController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createProfile);
router.get('/', authenticateUser, getProfile);
router.put('/', authenticateUser, updateProfile);
router.delete('/', authenticateUser, deleteProfile);

export default router;
