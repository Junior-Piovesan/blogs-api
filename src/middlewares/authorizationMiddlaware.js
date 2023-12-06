const jwt = require('jsonwebtoken');

const codeHTTP = require('../utils/HTTPCode');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const authentication = (req, res, next) => {
  const { authorization } = req.headers;
  const { JWT_SECRET } = process.env;

  if (!authorization) {
    return res.status(mapStatusHTTP(codeHTTP.UNAUTHORIZED)).json({ message: 'Token not found',
    });
  }
  const [, token] = authorization.split(' ');

  try {
    const claims = jwt.verify(token, JWT_SECRET);
    res.locals.user = {
      email: claims.data.email,
    };
  } catch (error) {
    return res.status(mapStatusHTTP(codeHTTP.UNAUTHORIZED))
      .json({ message: 'Expired or invalid token',
      });
  }
  
  return next();
}; 

module.exports = {
  authentication,
};