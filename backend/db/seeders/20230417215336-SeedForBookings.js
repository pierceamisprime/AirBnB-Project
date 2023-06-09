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
      startDate: new Date('2020-01-01'),
      endDate: new Date('2020-01-05')
    },
    {
      spotId: 2,
      userId: 1,
      startDate: new Date('2022-12-05'),
      endDate: new Date('2022-12-09')
    },
    {
      spotId: 3,
      userId: 2,
      startDate: new Date('2021-11-11'),
      endDate: new Date('2021-11-18')
    },
    {
      spotId: 1,
      userId: 3,
      startDate: new Date('2019-10-23'),
      endDate: new Date('2019-10-23')
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
