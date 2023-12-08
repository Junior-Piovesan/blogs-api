const { Category, User } = require('../models');

const queryPosts = {    
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
};

module.exports = queryPosts;