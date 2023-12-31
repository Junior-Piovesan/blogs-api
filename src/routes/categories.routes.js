const router = require('express').Router();

const categoriesControllers = require('../controllers/categories.controllers');

const authenticationMIddleware = require('../middlewares/authorizationMiddlaware');

const middlawares = require('../middlewares/categories.middleware');

router.get(
  '/categories',
  authenticationMIddleware.authentication,
  categoriesControllers.getAllCategories,
);

router.post(
  '/categories',
  authenticationMIddleware.authentication,
  middlawares.checkNewCategory,
  categoriesControllers.registerCategory,
  
);

module.exports = router;