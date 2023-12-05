const userService = require('../services/user.service');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const loginResponse = async (req, res) => {
  const { email, password } = req.body;

  const { status, data } = await userService
    .checkLogin(email, password);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  loginResponse,
};