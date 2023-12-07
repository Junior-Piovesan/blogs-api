const returnSuccessStatus = require('../utils/returnSuccessStatus');
const returnErrorStatus = require('../utils/returnErrorStatus');
const createToken = require('../utils/createToken');

const codeHTTP = require('../utils/HTTPCode');

const { User } = require('../models');

const checkLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.dataValues.password !== password) {
    return returnErrorStatus(codeHTTP.BAD_REQUEST, 'Invalid fields');
  }
  
  const token = createToken({ email, password });

  return returnSuccessStatus(codeHTTP.SUCCESS, { token });
};

const checkUserCreation = async (newUser) => {
  const { displayName, email, password, image } = newUser;

  const checkEmailregistered = await User.findOne({ where: { email } });

  if (checkEmailregistered) {
    return returnSuccessStatus(codeHTTP.CONFLICT, { message: 'User already registered' });
  }

  await User.create({ displayName, email, password, image });

  const token = createToken(newUser);
  
  return returnSuccessStatus(codeHTTP.CREATED, { token });
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });   

  return returnSuccessStatus(codeHTTP.SUCCESS, users);
};

const checkUserIdExist = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    return returnErrorStatus(codeHTTP.NOT_FOUND, 'User does not exist');
  }
  return returnSuccessStatus(codeHTTP.SUCCESS, user);
};

const deleteUser = async ({ email }) => {
  const userInfo = await User.findOne({ where: { email } });
  console.log(userInfo.dataValues.id);
  await User.destroy({ where: { id: userInfo.dataValues.id } });
  return returnSuccessStatus(codeHTTP.NO_CONTENT, '');
};

module.exports = { checkLogin, checkUserCreation, getAllUsers, checkUserIdExist, deleteUser,
};