const Joi = require('joi');

const loginValidate = Joi.object({
  email: Joi.string().email().min(2).required(),

  password: Joi.string().min(1).required(),
});

const createUserValidate = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().optional(),
});

const createNewCategoryValidate = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = {
  loginValidate,
  createUserValidate,
  createNewCategoryValidate,
  
};