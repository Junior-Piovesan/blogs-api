const returnErrorResponse = require('../utils/returnErrorStatus');
const returnSuccessResponse = require('../utils/returnSuccessStatus');

const codeHTTP = require('../utils/HTTPCode');

const getPost = require('../utils/getPost');

const { Category, BlogPost, User, PostCategory, sequelize } = require('../models');

const checkRegisteredPost = async (post, { email }) => {
  const { title, content, categoryIds } = post;
  
  const user = await User
    .findOne({ where: { email }, attributes: { exclude: ['password'] } });

  const categories = await Promise.all(categoryIds
    .map((categoryId) => Category.findByPk(categoryId)));

  if (categories.includes(null)) {
    return returnErrorResponse(codeHTTP.BAD_REQUEST, 'one or more "categoryIds" not found');
  }

  const response = await sequelize.transaction(async (t) => {
    const createdPost = await BlogPost
      .create({
        title, content, userId: user.dataValues.id, published: new Date() }, { transation: t });
  
    await Promise.all(categoryIds.map((category) => PostCategory
      .create({ postId: createdPost.dataValues.id, categoryId: category }, { transaction: t })));

    return createdPost;
  });

  return returnSuccessResponse(codeHTTP.CREATED, response);
};

const getAllPostsWithCategoriesAndUsers = async () => {
  const posts = await getPost.allPosts({ BlogPost, User, Category });
  
  return returnSuccessResponse(codeHTTP.SUCCESS, posts);
};

const checkPostExist = async (id) => {
  const postExists = await BlogPost.findByPk(id);

  if (!postExists) { 
    return returnErrorResponse(codeHTTP.NOT_FOUND, 'Post does not exist'); 
  }

  const post = await getPost.byId(id, { BlogPost, User, Category });

  return returnSuccessResponse(codeHTTP.SUCCESS, post);
};

module.exports = {
  checkRegisteredPost,
  getAllPostsWithCategoriesAndUsers,
  checkPostExist,
};