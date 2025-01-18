'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Assets'
    await queryInterface.bulkInsert(options, [

    {
      asset_name: 'Home',
      type: 'Real-Estate',
      amount: 500000.00,
      liquid: 500000.00,
      ownerId: 1,  
      liabilityId: 1,  
      investmentId: 1,  
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
      asset_name: 'Apple',
      type: 'Stock',
      amount: 150000.00,
      liquid: 0,
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
      liquid: 0,
      ownerId: 3,  
      liabilityId: null,  
      investmentId: 3,  
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
      asset_name: 'Checking Account',
      type: 'Cash',
      amount: 30000.00,
      liquid: 30000.00,
      ownerId: 1,  
      liabilityId: null,  
      investmentId: null,  
      createdAt: new Date(),
      updatedAt: new Date()
  },
  {
      asset_name: 'Business Equipment',
      type: 'Property',
      amount: 80000.00,
      liquid: 0,
      ownerId: 1,  
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
    options.tableName = 'Assets';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
