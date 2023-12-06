const categoriesServices = require('../services/categories.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const registerCategory = async (req, res) => {
  const category = req.body;

  const { status, data } = await categoriesServices.checksCategoryRegistration(category);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = { registerCategory };