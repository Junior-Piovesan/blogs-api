const returnSuccessStatus = require('../utils/returnSuccessStatus');
const returnErrorStatus = require('../utils/returnErrorStatus');
const createToken = require('../utils/createToken');

const {
  SUCCESS,
  BAD_REQUEST,
  CREATED,
  CONFLICT,

} = require('../utils/HTTPCode');

const { User } = require('../models');

const checkLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.dataValues.password !== password) {
    return returnErrorStatus(BAD_REQUEST, 'Invalid fields');
  }
  
  const token = createToken({ email, password });

  return returnSuccessStatus(SUCCESS, { token });
};

const checkUserCreation = async (newUser) => {
  const { displayName, email, password, image } = newUser;

  const checkEmailregistered = await User.findOne({ where: { email } });

  console.log(checkEmailregistered);
  console.log(email);

  if (checkEmailregistered) {
    return returnSuccessStatus(CONFLICT, { message: 'User already registered' });
  }

  await User.create({
    displayName,
    email,
    password,
    image,
  });

  const token = createToken(newUser);
  
  return returnSuccessStatus(CREATED, { token });
};

module.exports = {
  checkLogin,
  checkUserCreation,
};