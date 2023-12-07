const returnErrorResponse = require('../utils/returnErrorStatus');
const returnSuccessResponse = require('../utils/returnSuccessStatus');

const codeHTTP = require('../utils/HTTPCode');

const getPost = require('../utils/getPost');

const { Category, BlogPost, User } = require('../models');

const checkDeletePost = async (id, user) => {
  const post = await getPost.byId(id, { BlogPost, User, Category });

  if (!post) {
    return returnErrorResponse(codeHTTP.NOT_FOUND, 'Post does not exist');
  }
  console.log(post.dataValues.user.email);

  if (post.dataValues.user.email !== user.email) {
    return returnErrorResponse(codeHTTP.UNAUTHORIZED, 'Unauthorized user');
  }

  await BlogPost.destroy({ where: { id } });

  return returnSuccessResponse(codeHTTP.NO_CONTENT, post);
};

module.exports = {
  checkDeletePost,
};