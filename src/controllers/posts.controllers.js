const getPostsServices = require('../services/postsGet.service');
const postCreateService = require('../services/postCreate.service');
const postUpadateService = require('../services/postsUpdate.service');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const registerPost = async (req, res) => {
  const { user } = res.locals;
  const post = req.body;
  const { status, data } = await postCreateService
    .checkRegisteredPost(post, user);

  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllPosts = async (_req, res) => {
  const { status, data } = await getPostsServices
    .getAllPostsWithCategoriesAndUsers();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await getPostsServices.getPostById(id);

  res.status(mapStatusHTTP(status)).json(data);
};

const updatePost = async (req, res) => {
  const { user } = res.locals;
  const post = req.body;
  const { id } = req.params;
  const { status, data } = await postUpadateService.checkPostUpdate(post, user, id);

  return res.status(mapStatusHTTP(status)).json(data);
};
module.exports = {
  registerPost,
  getAllPosts,
  getPostById,
  updatePost,
};