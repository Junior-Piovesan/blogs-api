/* eslint-disable max-lines-per-function */
const returnErrorResponse = require('../utils/returnErrorStatus');
const returnSuccessResponse = require('../utils/returnSuccessStatus');

const codeHTTP = require('../utils/HTTPCode');

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
  const posts = await BlogPost.findAll(
    { 
      attributes: { exclude: ['user_id'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    },
  );

  return returnSuccessResponse(codeHTTP.SUCCESS, posts);
};

module.exports = {
  checkRegisteredPost,
  getAllPostsWithCategoriesAndUsers,
};