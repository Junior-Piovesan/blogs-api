const router = require('express').Router();

const userRouter = require('./user.routes');
const categoriesRouter = require('./categories.routes');

router.use(userRouter);
router.use(categoriesRouter);

module.exports = router;