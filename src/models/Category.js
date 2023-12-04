const categoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },

    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    timestamps:false,
    tableName:'categories',
    underscored:true,
  },)

Category.associate = (models) => {
  Category.hasMany(models.PostCategory, {
    foreignKey: 'categoryId',
    as: 'categoryId'
  })
}

  return  Category
}

module.exports = categoryModel