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
   options.tableName = 'Reviews'
   await queryInterface.bulkInsert(options, [

    {
    spotId: 1,
    userId: 2,
    review: 'Lovely place, had a great time!',
    stars: 5.0
   },
    {
    spotId: 2,
    userId: 1,
    review: 'Great place for family!!',
    stars: 4.0
   },
    {
    spotId: 3,
    userId: 2,
    review: 'smaller than expected',
    stars: 2.0
   },
    {
    spotId: 1,
    userId: 3,
    review: 'Really good area with lots of activities, loved it!',
    stars: 5.0
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
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, {})
  }
};
