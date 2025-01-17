'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Liabilities'
    await queryInterface.bulkInsert('Liabilities', [
  {
    liability_name: 'Mortgage Loan',
    type: 'Loan',
    amount: 150000.00,
    ownerId: 1,
    assetId: 3,
    investmentId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    liability_name: 'Car Loan',
    type: 'Vehicle',
    amount: 25000.00,
    ownerId: 2,
    assetId: 4,
    investmentId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    liability_name: 'Credit Card Debt',
    type: 'Consumer Debt',
    amount: 5000.00,
    ownerId: 3,
    assetId: 5,
    investmentId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    liability_name: 'Student Loan',
    type: 'Education',
    amount: 35000.00,
    ownerId: 4,
    assetId: 6,
    investmentId: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    liability_name: 'Personal Loan',
    type: 'Personal Debt',
    amount: 10000.00,
    ownerId: 5,
    assetId: 7,
    investmentId: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Liabilities';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
