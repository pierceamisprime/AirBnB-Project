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
   options.tableName = 'Spots'
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '1541 NE 181st Ave',
      city: 'Portland',
      state: 'Oregon',
      country: 'United States',
      lat: 522.4760827,
      lng: 543.5564378,
      name: '24 Hour Fitness',
      description: 'Beautiful gym open 24 hours a day!',
      price: 250.50
    },
    {
      ownerId: 2,
      address: '16571 Ventura Blvd',
      city: 'Encino',
      state: 'California',
      country: 'United States',
      lat: 522.4765637,
      lng: -122.5564378,
      name: 'Zoo Culture',
      description: 'Beautiful gym to get shredded',
      price: 450.00
    },
    {
      ownerId: 3,
      address: '1502 Industrial Dr',
      city: 'Missouri City',
      state: 'Texas',
      country: 'United States',
      lat: 102.4723526,
      lng: 986.5554378,
      name: 'Alphaland',
      description: 'Huge fitness compound, includes 3 gyms, alphaeats, and basketball court.',
      price: 725.00
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
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, {})
  }
};
