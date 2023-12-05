const router = require('express').Router();

const userRouter = require('./login.routes');

router.use(userRouter);

module.exports = router;