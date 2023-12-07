const postsServices = require('../services/posts.service');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const registerPost = async (req, res) => {
  const { user } = res.locals;
  const post = req.body;
  const { status, data } = await postsServices.checkRegisteredPost(post, user);

  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllPosts = async (_req, res) => {
  const { status, data } = await postsServices
    .getAllPostsWithCategoriesAndUsers();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await postsServices.checkPostExist(id);

  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  registerPost,
  getAllPosts,
  getPostById,
};