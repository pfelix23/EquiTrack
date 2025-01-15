'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {
        username: 'johnDoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        hashedPassword: bcrypt.hashSync('password'),
      
      },
      {
        username: 'janeSmith',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janesmith@example.com',
        hashedPassword: bcrypt.hashSync('password2')
      
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        username: 'michaelbrown',
        email: 'michaelbrown@example.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Sophia',
        lastName: 'Taylor',
        username: 'sophiataylor',
        email: 'sophiataylor@example.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Ethan',
        lastName: 'Davis',
        username: 'ethandavis',
        email: 'ethandavis@example.com',
        hashedPassword: bcrypt.hashSync('password2')
      }
    ], {});
  },
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
