const router = require('express').Router();

const authenticationMIddleware = require('../middlewares/authorizationMiddlaware');
const middlewares = require('../middlewares/postsMiddlaware');

const postsControllers = require('../controllers/posts.controllers');

router.get(
  '/post',
  authenticationMIddleware.authentication,
  postsControllers.getAllPosts,
);

router.get(
  '/post/:id',
  authenticationMIddleware.authentication,
  postsControllers.getPostById,
);

router.post(
  '/post',
  authenticationMIddleware.authentication,
  middlewares.checkPostRegistration,
  postsControllers.registerPost,

);
module.exports = router;