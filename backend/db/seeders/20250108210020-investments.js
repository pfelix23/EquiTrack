'use strict';

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

    await queryInterface.bulkInsert('Investments', [
      {
        investment_name: 'Investment 1', 
        type: 'Stocks',                   
        amount: 10000.00,                 
        ROR: 5.5,                         
        length: 5,                        
        risk_percentage: 10,              
        projection: 15000.00,             
        ownerId: 1,                        
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        investment_name: 'Investment 2',
        type: 'Real Estate',
        amount: 50000.00,
        ROR: 7.0,
        length: 10,
        risk_percentage: 8,
        projection: 80000.00,
        ownerId: 2,                       
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
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
