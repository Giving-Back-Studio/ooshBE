const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.createOpportunityValidators = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('start_date').isISO8601().toDate().withMessage('Invalid start date'),
  body('end_date').isISO8601().toDate().withMessage('Invalid end date'),
  body('details').notEmpty().withMessage('Details are required'),
  validateRequest
];

exports.createFarmEnterpriseValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('website_url').isURL().withMessage('Invalid website URL'),
  body('instagram_url').optional().isURL().withMessage('Invalid Instagram URL'),
  body('facebook_url').optional().isURL().withMessage('Invalid Facebook URL'),
  body('twitter_url').optional().isURL().withMessage('Invalid Twitter URL'),
  validateRequest
];

// Add more validators as needed for other endpoints
