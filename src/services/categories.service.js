const returnSuccessStatus = require('../utils/returnSuccessStatus');
const returnErrorStatus = require('../utils/returnErrorStatus');

const codeHTTP = require('../utils/HTTPCode');

const { Category } = require('../models');

const checksCategoryRegistration = async (newCategory) => {
  const categoryExists = await Category.findOne({ where: { name: newCategory.name } });

  if (categoryExists) {
    return returnErrorStatus(codeHTTP.CONFLICT, 'Conflict');
  }

  const registeredCategory = await Category.create(newCategory);

  return returnSuccessStatus(codeHTTP.CREATED, registeredCategory);
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return returnSuccessStatus(codeHTTP.SUCCESS, categories);
};

module.exports = {
  checksCategoryRegistration,
  getAllCategories,
};