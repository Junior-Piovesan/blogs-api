const allPosts = async (models) => {
  const posts = await models.BlogPost.findAll(
    { 
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
    },
  );
  return posts;
};

const byId = async (id, models) => {
  const post = await models.BlogPost.findOne({
    where: { id },
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
  return post;
};
module.exports = {
  byId,
  allPosts,
};