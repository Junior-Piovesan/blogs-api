const { Category, BlogPost, User } = require('../models');

const getPost = require('./getPost');

const checkPostBelongsUser = async (id) => {
  const postToUpdate = await getPost.byId(id, { BlogPost, User, Category });
};