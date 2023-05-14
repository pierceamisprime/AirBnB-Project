'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo-user@gmail.com',
      username: 'morethanademo12',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      firstName: 'Pierce',
      lastName: 'Henriksbo',
      email: 'phenny@gmail.com',
      username: 'phenny',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      firstName: 'Peter',
      lastName: 'Parker',
      email: 'PeteP@gmail.com',
      username: 'SpideySense23',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      firstName: 'Ichigo',
      lastName: 'Kurosaki',
      email: 'Ichi@gmail.com',
      username: 'SoulReaper123',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      firstName: 'optimus',
      lastName: 'prime',
      email: 'optimusprime@gmail.com',
      username: 'optimusprime',
      hashedPassword: bcrypt.hashSync('password')
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {})
  }
};
