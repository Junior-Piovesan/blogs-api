const returnErrorResponse = require('../utils/returnErrorStatus');
const returnSuccessResponse = require('../utils/returnSuccessStatus');

const codeHTTP = require('../utils/HTTPCode');

const getPost = require('../utils/getPost');

const { Category, BlogPost, User } = require('../models');

const getAllPostsWithCategoriesAndUsers = async () => {
  const posts = await getPost.allPosts({ BlogPost, User, Category });

  return returnSuccessResponse(codeHTTP.SUCCESS, posts);
};

const getPostById = async (id) => {
  const postExists = await BlogPost.findByPk(id);

  if (!postExists) { 
    return returnErrorResponse(codeHTTP.NOT_FOUND, 'Post does not exist'); 
  }

  const post = await getPost.byId(id, { BlogPost, User, Category });

  return returnSuccessResponse(codeHTTP.SUCCESS, post);
};

module.exports = {
  getAllPostsWithCategoriesAndUsers,
  getPostById,
};