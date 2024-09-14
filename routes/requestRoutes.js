const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, requestController.createRequest);
router.get('/', requestController.getRequests);
router.get('/:id', requestController.getRequest);
router.put('/:id', authenticateUser, requestController.updateRequest);
router.delete('/:id', authenticateUser, requestController.deleteRequest);

module.exports = router;
