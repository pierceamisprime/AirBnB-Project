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
   options.tableName = 'Bookings'
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 2,
      startDate: 1-5-20,
      endDate: 1-5-20
    },
    {
      spotId: 2,
      userId: 1,
      startDate: 12-5-22,
      endDate: 12-9-22
    },
    {
      spotId: 3,
      userId: 2,
      startDate: 11-11-21,
      endDate: 11-18-21
    },
    {
      spotId: 1,
      userId: 3,
      startDate: 10-21-19,
      endDate: 10-23-19
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
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, {})
  }
};
