'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
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
    options.tableName = 'Investments'
    await queryInterface.bulkInsert(options, [
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
      },
      {
        investment_name: 'Investment 3',
        type: 'Bonds',
        amount: 20000.00,
        ROR: 3.0,
        length: 7,
        risk_percentage: 4,
        projection: 24000.00,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        investment_name: 'Investment 4',
        type: 'Mutual Funds',
        amount: 15000.00,
        ROR: 6.0,
        length: 8,
        risk_percentage: 5,
        projection: 21000.00,
        ownerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        investment_name: 'Investment 5',
        type: 'Cryptocurrency',
        amount: 10000.00,
        ROR: 15.0,
        length: 3,
        risk_percentage: 20,
        projection: 15000.00,
        ownerId: 1,
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
    options.tableName = 'Investments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
