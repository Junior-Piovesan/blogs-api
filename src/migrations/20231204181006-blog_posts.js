'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('blog_posts', {
      id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },

        onUpdate: 'CASCADE',
        onDelete:'CASCADE',
      },

      published: {
        type: Sequelize.DATE,
        allowNull:false,
      },

      updated: {
        type: Sequelize.DATE,
        allowNull:false,
      },

    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('blog_posts',null,{})
  }
};
