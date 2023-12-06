const router = require('express').Router();

const authenticationMIddleware = require('../middlewares/authorizationMiddlaware');
const middlewares = require('../middlewares/postsMiddlaware');

const postsControllers = require('../controllers/posts.controllers');

router.post(
  '/post',
  authenticationMIddleware.authentication,
  middlewares.checkPostRegistration,
  postsControllers.registerPost,

);
module.exports = router;