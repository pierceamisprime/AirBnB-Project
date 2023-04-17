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
   options.tableName = 'Spotimages'
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'url/image/1',
      preview: true
    },
    {
      spotId: 2,
      url: 'url/image/2',
      preview: true
    },
    {
      spotId: 3,
      url: 'url/image/3',
      preview: true
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
    options.tableName = 'Spotimages'
    await queryInterface.bulkDelete(options, {})
  }
};
