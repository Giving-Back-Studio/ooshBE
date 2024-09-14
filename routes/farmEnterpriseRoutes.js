const express = require('express');
const router = express.Router();
const farmEnterpriseController = require('../controllers/farmEnterpriseController');

router.post('/', farmEnterpriseController.createFarmEnterprise);
router.get('/', farmEnterpriseController.getFarmEnterprises);

module.exports = router;
