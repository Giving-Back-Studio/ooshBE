const { body, param, query, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

const opportunityValidators = {
  create: [
    body('title').notEmpty().withMessage('Title is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('start_date').isISO8601().toDate().withMessage('Invalid start date'),
    body('end_date').isISO8601().toDate().withMessage('Invalid end date'),
    body('details').notEmpty().withMessage('Details are required'),
  ],
  getById: [
    param('id').isUUID().withMessage('Invalid opportunity ID'),
  ],
};

const farmEnterpriseValidators = {
  create: [
    body('name').notEmpty().withMessage('Name is required'),
    body('website_url').isURL().withMessage('Invalid website URL'),
    body('instagram_url').optional().isURL().withMessage('Invalid Instagram URL'),
    body('facebook_url').optional().isURL().withMessage('Invalid Facebook URL'),
    body('twitter_url').optional().isURL().withMessage('Invalid Twitter URL'),
  ],
};

const requestValidators = {
  create: [
    body('title').notEmpty().withMessage('Title is required'),
    body('details').notEmpty().withMessage('Details are required'),
  ],
  getById: [
    param('id').isUUID().withMessage('Invalid request ID'),
  ],
};

const principleValidators = {
  create: [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
};

module.exports = {
  validate,
  opportunityValidators,
  farmEnterpriseValidators,
  requestValidators,
  principleValidators,
};
