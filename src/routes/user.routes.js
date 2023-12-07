const router = require('express').Router();

const middlawares = require('../middlewares/userMidlawares');
const authorizationMiddlaware = require('../middlewares/authorizationMiddlaware');

const userControllers = require('../controllers/user.controllers');

router.get(
  '/user',
  authorizationMiddlaware.authentication,
  userControllers.getAllUsers,
);

router.get(
  '/user/:id',
  authorizationMiddlaware.authentication,
  userControllers.getUserById,

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

router.delete(
  '/user/me',
  authorizationMiddlaware.authentication,
  userControllers.deleteUserResponse,
);

module.exports = router;