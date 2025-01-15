'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Assets', [

    {
      asset_name: 'Home',
      type: 'Home',
      amount: 500000.00,
      net_assets: 480000.00,
      net_deficiency: 20000.00,
      ownerId: 1,  
      liabilityId: 1,  
      investmentId: 1,  
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
      asset_name: 'S&P 500 Stock Portfolio',
      type: 'Investment',
      amount: 150000.00,
      net_assets: 145000.00,
      net_deficiency: 5000.00,
      ownerId: 2,  
      liabilityId: null,  
      investmentId: 2,  
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
      asset_name: 'Computer',
      type: 'Equipment',
      amount: 2000.00,
      net_assets: 195000.00,
      net_deficiency: 5000.00,
      ownerId: 3,  
      liabilityId: null,  
      investmentId: 3,  
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
      asset_name: 'Savings Account',
      type: 'Cash',
      amount: 30000.00,
      net_assets: 30000.00,
      net_deficiency: 0.00,
      ownerId: 4,  
      liabilityId: null,  
      investmentId: null,  
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
      asset_name: 'Business Equipment',
      type: 'Property',
      amount: 80000.00,
      net_assets: 75000.00,
      net_deficiency: 5000.00,
      ownerId: 5,  
      liabilityId: 2,  
      investmentId: null,  
      createdAt: new Date(),
      updatedAt: new Date()
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
