const schema = require('../utils/schemas');

const codeHTTP = require('../utils/HTTPCode');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const checkNewCategory = (req, res, next) => {
  const newcategory = req.body;
  const { error } = schema.createNewCategoryValidate.validate(newcategory);
  if (error) {
    return res.status(mapStatusHTTP(codeHTTP.BAD_REQUEST)).json({ message: error.message });
  }

  return next();
};

module.exports = { checkNewCategory };