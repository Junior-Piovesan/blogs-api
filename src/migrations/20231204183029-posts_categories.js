'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('posts_categories', {
        postId: {
          type:Sequelize.INTEGER,
          primaryKey:true,
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
          type:Sequelize.INTEGER,
          primaryKey:true,
          field:'category_id',
          primaryKey: true,

          references: {
            model: 'categories',
            key:'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },

      })
  },

  async down (queryInterface, _Sequelize) {
      await queryInterface.dropTable('posts_categories',null,{})
  }
};
