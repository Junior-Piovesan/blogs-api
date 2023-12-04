const postCategory = (sequelize,DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',{
    postId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      field:'post_id',
      primaryKey: true,

      references: {
        model: 'blog_posts',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    categoryId: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      field:'category_id',
      primaryKey: true,

      references: {
        model: 'categories',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  })

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,{
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'categoryId',
    })

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'postId'
    })

  }

  return PostCategory
}

module.exports = postCategory