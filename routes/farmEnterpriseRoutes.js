import express from 'express';
import { createFarmEnterprise, getFarmEnterprises, updateFarmEnterprise } from '../controllers/farmEnterpriseController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateUser, createFarmEnterprise);
router.get('/', authenticateUser, getFarmEnterprises);
router.put('/:id', authenticateUser, updateFarmEnterprise);

export default router;
