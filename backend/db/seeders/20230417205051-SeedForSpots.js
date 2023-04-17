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
      address: '4356 Roudy Rd',
      city: 'Orlando',
      State: 'Washington',
      Country: 'United States',
      lat: 522.4760827,
      lng: 543.5564378,
      name: 'Moda Center',
      description: 'Beautiful home where ballers are created',
      price: 250.50
    },
    {
      ownerId: 2,
      address: '5607 SE Ave',
      city: 'Austin',
      State: 'Arizona',
      Country: 'United States',
      lat: 522.4765637,
      lng: -122.5564378,
      name: 'Disney World',
      description: 'A place where dreams come true',
      price: 450.00
    },
    {
      ownerId: 3,
      address: '5201 NW Steet',
      city: 'Tempe',
      State: 'Oregon',
      Country: 'United States',
      lat: 102.4723526,
      lng: 986.5554378,
      name: 'App Academy',
      description: 'Absolute magical amazing beautiful majestic home',
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
