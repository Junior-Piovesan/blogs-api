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

module.exports = {
  checksCategoryRegistration,
};