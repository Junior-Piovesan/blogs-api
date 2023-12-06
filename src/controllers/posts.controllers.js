const postsServices = require('../services/posts.service');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const registerPost = async (req, res) => {
  const { user } = res.locals;
  const post = req.body;
  const { status, data } = await postsServices.checkRegisteredPost(post, user);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  registerPost,
};