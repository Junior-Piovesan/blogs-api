const router = require('express').Router();

const userRouter = require('./user.routes');
const categoriesRouter = require('./categories.routes');
const postsRouter = require('./posts.routes');

router.use(userRouter);
router.use(categoriesRouter);
router.use(postsRouter);

module.exports = router;