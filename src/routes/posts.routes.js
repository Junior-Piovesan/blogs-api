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
  '/post/search',
  authenticationMIddleware.authentication,
  postsControllers.getPostsByQueryResponse,
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

router.put(
  '/post/:id',
  authenticationMIddleware.authentication,
  middlewares.checkUpdatePost,
  postsControllers.updatePost,
);

router.delete(
  '/post/:id',
  authenticationMIddleware.authentication,
  postsControllers.deletePost,
);

module.exports = router;