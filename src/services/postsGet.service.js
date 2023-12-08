const { Op } = require('sequelize');
const returnErrorResponse = require('../utils/returnErrorStatus');
const returnSuccessResponse = require('../utils/returnSuccessStatus');

const codeHTTP = require('../utils/HTTPCode');

const getPost = require('../utils/getPost');

const { Category, BlogPost, User } = require('../models');
const queryPosts = require('../utils/queryPosts');

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

const getUserByQueryParam = async (query) => {
  const postsByTitle = await BlogPost.findAll({
    where: { 
      title: { [Op.like]: `%${query}%`,
        
      },
    }, 
    ...queryPosts,
  });

  const postsByContent = await BlogPost.findAll({
    where: { 
      content: { [Op.like]: `%${query}%`,
        
      },
    }, 
    ...queryPosts,
  });

  if (postsByTitle.length > postsByContent) {
    return returnSuccessResponse(codeHTTP.SUCCESS, postsByTitle);
  }
  return returnSuccessResponse(codeHTTP.SUCCESS, postsByContent);
};

module.exports = {
  getAllPostsWithCategoriesAndUsers,
  getPostById,
  getUserByQueryParam,
};