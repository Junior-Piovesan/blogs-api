const queryPosts = (models) => ({ 
  attributes: { exclude: ['user_id'] },
  include: [
    {
      model: models.User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: models.Category,
      as: 'categories',
      through: { attributes: [] },
    },
  ],
}); 

module.exports = {
  queryPosts,
};