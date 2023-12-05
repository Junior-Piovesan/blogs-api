const router = require('express').Router();

const { checkLogin } = require('../middlewares/midlawares');

const userControllers = require('../controllers/user.controllers');

router.post(
  '/login',
  checkLogin,
  userControllers.loginResponse,
);

module.exports = router;