const codeHTTP = require('../utils/HTTPCode');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const checkPostRegistration = (req, res, next) => {
  const newPost = req.body;

  if (newPost.title.length < 1 || newPost.content.length < 1) {
    return res.status(mapStatusHTTP(codeHTTP.BAD_REQUEST))
      .json({ message: 'Some required fields are missing' });
  }

  if (newPost.categoryIds.length !== 2) {
    return res.status(mapStatusHTTP(codeHTTP.BAD_REQUEST))
      .json({ message: 'one or more "categoryIds" not found' });
  }

  return next();
};

const checkUpdatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(mapStatusHTTP(codeHTTP.BAD_REQUEST))
      .json({ message: 'Some required fields are missing',
      });
  }

  if (title.length < 1 || content.length < 1) {
    return res.status(mapStatusHTTP(codeHTTP.BAD_REQUEST))
      .json({ message: 'Some required fields are missing',
      });
  }
  return next();
};

module.exports = {
  checkPostRegistration,
  checkUpdatePost,
};
