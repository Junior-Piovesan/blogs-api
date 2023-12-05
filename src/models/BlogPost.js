const blogPostModel = (sequelize,DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },

      onUpdate: 'CASCADE',
      onDelete:'CASCADE',
    },

    published: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'blog_posts',
    underscored: true,
  },)
  
  BlogPost.associate = (models) => {
    BlogPost.hasMany(models.PostCategory,{
      foreignKey: 'categoryId',
      as: 'categoryId'
    })

    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }

  return BlogPost
}

module.exports = blogPostModel