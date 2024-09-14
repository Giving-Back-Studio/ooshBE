const express = require('express');
const router = express.Router();
const farmEnterpriseController = require('../controllers/farmEnterpriseController');
const { authenticateUser } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/', authenticateUser, upload.single('photo'), farmEnterpriseController.createFarmEnterprise);
router.get('/', farmEnterpriseController.getFarmEnterprises);
router.get('/:id', farmEnterpriseController.getFarmEnterprise);
router.put('/:id', authenticateUser, upload.single('photo'), farmEnterpriseController.updateFarmEnterprise);
router.delete('/:id', authenticateUser, farmEnterpriseController.deleteFarmEnterprise);

module.exports = router;
