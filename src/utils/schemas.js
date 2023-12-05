const Joi = require('joi');

const loginValidate = Joi.object({
  email: Joi.string().email().min(2).required(),

  password: Joi.string().min(1).required(),
});

module.exports = {
  loginValidate,
};