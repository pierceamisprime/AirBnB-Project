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
    review: 'Lovely gym, had a great workout!',
    stars: 5.0
   },
    {
    spotId: 2,
    userId: 1,
    review: 'Great place for powerlifting!!',
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
    review: 'Really cool gym with lots of classes, love it!',
    stars: 5.0
   },
    {
    spotId: 4,
    userId: 4,
    review: 'Really nice equipment!',
    stars: 4.0
   },
    {
    spotId: 5,
    userId: 4,
    review: 'Solid gym',
    stars: 3.0
   },
    {
    spotId: 6,
    userId: 3,
    review: 'Super freindly staff!',
    stars: 5.0
   },
    {
    spotId: 7,
    userId: 2,
    review: 'Awesome sauna',
    stars: 4.0
   },
    {
    spotId: 8,
    userId: 5,
    review: 'Got a huge pump',
    stars: 5.0
   },
    {
    spotId: 9,
    userId: 3,
    review: 'needs updated equipment',
    stars: 2.0
   },
    {
    spotId: 10,
    userId: 4,
    review: 'super nice',
    stars: 5.0
   },
    {
    spotId: 11,
    userId: 1,
    review: 'pretty nice gym',
    stars: 4.0
   },
    {
    spotId: 12,
    userId: 2,
    review: 'super clean!!',
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
