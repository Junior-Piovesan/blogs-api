const userModel = (sequelize,DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
    },

     displayName:{
      type: DataTypes.STRING,
      allowNull:false,
      field: 'display_name'
    },

     email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
    },
     
     password: {
      type:DataTypes.STRING,
      allowNull:false,
    },

     image: {
      type:DataTypes.STRING,
    }
  },
  {
    timestamps:false,
    tableName: 'users',
    underscored:true,
  },)

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'user_id',
      as: 'userId'
    })
  }

  return User
}

module.exports = userModel