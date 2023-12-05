const returnSuccessStatus = require('../utils/returnSuccessStatus');
const returnErrorStatus = require('../utils/returnErrorStatus');
const createToken = require('../utils/createToken');

const {
  SUCCESS,
  BAD_REQUEST,
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

module.exports = {
  checkLogin,
};