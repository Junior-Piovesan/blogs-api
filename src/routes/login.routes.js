const router = require('express').Router();

const middlawares = require('../middlewares/midlawares');

const userControllers = require('../controllers/user.controllers');

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