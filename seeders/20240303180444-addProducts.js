'use strict';
const products = require('../data/products.json');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    const createdAt = new Date();
    const updatedAt = new Date();
    await queryInterface.bulkInsert('products', products.map(p => ({ createdAt, updatedAt, ...p, category: 'New Category' })), {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('products', null, {});
  }
};
