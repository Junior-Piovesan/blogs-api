const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { JWT_SECRET } = process.env;

  const token = jwt
    .sign({ data: { userName: user.displayName } }, JWT_SECRET, jwtConfig);

  return token;
};

module.exports = createToken;