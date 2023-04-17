'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'ReviewImages'
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'url/image/1'
    },
    {
      reviewId: 2,
      url: 'url/image/2'
    },
    {
      reviewId: 3,
      url: 'url/image/3'
    },
    {
      reviewId: 4,
      url: 'url/image/4'
    },
    {
      reviewId: 4,
      url: 'url/image/5'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
