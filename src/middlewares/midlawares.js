const {
  BAD_REQUEST,
} = require('../utils/HTTPCode');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const checkLogin = (req, res, next) => {
  const { email, password } = req.body;

  if ((!email || !password)) {
    return res.status(mapStatusHTTP(BAD_REQUEST))
      .json({ message: 'Some required fields are missing' });
  }
  
  if ((email.length < 1 || password.length < 1)) {
    return res.status(mapStatusHTTP(BAD_REQUEST))
      .json({ message: 'Invalid fields' });
  }

  return next();
};

const errorMiddleware = (error, _req, res, _next) => (
  res.status(500).json({ message: error.message }));

module.exports = {
  checkLogin,
  errorMiddleware,
};