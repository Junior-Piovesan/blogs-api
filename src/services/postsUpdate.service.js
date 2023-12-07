const returnErrorResponse = require('../utils/returnErrorStatus');
const returnSuccessResponse = require('../utils/returnSuccessStatus');

const codeHTTP = require('../utils/HTTPCode');

const getPost = require('../utils/getPost');

const { Category, BlogPost, User } = require('../models');

const checkPostUpdate = async (post, user, id) => {
  const postToUpdate = await getPost.byId(id, { BlogPost, User, Category });

  if (postToUpdate.dataValues.user.email !== user.email) {
    return returnErrorResponse(codeHTTP.UNAUTHORIZED, 'Unauthorized user');
  }

  await BlogPost.update({ post }, { where: { id } });

  const newPost = {
    ...postToUpdate.dataValues,
    title: post.title,
    content: post.content,
  };

  return returnSuccessResponse(codeHTTP.SUCCESS, newPost); 
};

module.exports = {
  checkPostUpdate,
};