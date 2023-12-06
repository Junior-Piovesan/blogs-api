// const sequelize = require('sequelize');

const returnErrorResponse = require('../utils/returnErrorStatus');
const returnSuccessResponse = require('../utils/returnSuccessStatus');

const codeHTTP = require('../utils/HTTPCode');

const { Category, BlogPost, User, PostCategory } = require('../models');

const checkRegisteredPost = async (post, { email }) => {
  const { title, content, categoryIds } = post;
  // const t = await new sequelize.Transaction();
  
  const user = await User
    .findOne({ where: { email }, attributes: { exclude: ['password'] } });

  const categories = await Promise.all(categoryIds
    .map((categoryId) => Category.findByPk(categoryId)));

  if (categories.includes(null)) {
    return returnErrorResponse(codeHTTP.BAD_REQUEST, 'one or more "categoryIds" not found');
  }
  
  const createdPost = await BlogPost.create(
    { title, content, userId: user.dataValues.id, published: new Date() },
  );

  await Promise.all(categoryIds.map((category) => PostCategory.create(
    { postId: createdPost.dataValues.id, categoryId: category },
  )));

  return returnSuccessResponse(codeHTTP.CREATED, createdPost);

  // const response = await sequelize.Transaction(async (t) => {
  //   const createdPost = await BlogPost
  //     .create({ title, content, userId: id, published: new Date() }, { transation: t });
  
  //   await Promise.all(categoryIds.map((category) => PostCategory
  //     .create({ postId: createdPost.dataValues.id, categoryId: category }, { transaction: t })));

  //   return createdPost;
  // });

  // return returnSuccessResponse(codeHTTP.CREATED, response);

  //   const createdPost = await BlogPost
  //     .create(
  //       { title, content, userId: id, published: new Date() },
  //       { transaction: t },
  //     );
  
  // try {
  //   const createdPost = await BlogPost
  //     .create(
  //       { title, content, userId: id, published: new Date() },
  //       { transaction: t },
  //     );

  //   await Promise.all(categoryIds.map((category) => PostCategory
  //     .create(
  //       { postId: createdPost.dataValues.id, categoryId: category },
  //       { transaction: t },
  //     )));

  //   await t.commit();
      
  //   return returnSuccessResponse(codeHTTP.CREATED, createdPost);
  // } catch (error) {
  //   console.log(error.message);
  //   await t.rollback();
  //   throw e;
  // }
};

module.exports = {
  checkRegisteredPost,
};