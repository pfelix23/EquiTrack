'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Liabilities', [
  {
    liability_name: 'Mortgage Loan',
    type: 'Real Estate',
    amount: 150000.00,
    net_assets: 0.00,
    net_deficiency: 150000.00,
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
    net_assets: 0.00,
    net_deficiency: 25000.00,
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
    net_assets: 0.00,
    net_deficiency: 5000.00,
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
    net_assets: 0.00,
    net_deficiency: 35000.00,
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
    net_assets: 0.00,
    net_deficiency: 10000.00,
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
  }
};
