const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');
const { createOpportunityValidators } = require('../middleware/validators');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, createOpportunityValidators, opportunityController.createOpportunity);
router.get('/', opportunityController.getOpportunities);
router.get('/:id', opportunityController.getOpportunity);
router.put('/:id', authenticateUser, opportunityController.updateOpportunity);
router.delete('/:id', authenticateUser, opportunityController.deleteOpportunity);

module.exports = router;
