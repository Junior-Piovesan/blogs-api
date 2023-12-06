const router = require('express').Router();

const middlawares = require('../middlewares/midlawares');
const authorizationMiddlaware = require('../middlewares/authorizationMiddlaware');

const userControllers = require('../controllers/user.controllers');

router.get(
  '/user',
  authorizationMiddlaware.authentication,
  userControllers.getAllUsers,
);

router.post(
  '/login',
  middlawares.checkLogin,
  userControllers.loginResponse,
);

router.post(
  '/user',
  middlawares.checkUserCreation,
  userControllers.createUserResponse,
);

module.exports = router;