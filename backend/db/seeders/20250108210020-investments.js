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
        type: 'S&P 500',                   
        amount: 100000.00,                 
        dailyRate: .118,                         
        length: 5,                        
        risk_percentage: .0175,                           
        ownerId: 1,                        
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        investment_name: 'Investment 2',
        type: 'Real-Estate',
        amount: 50000.00,
        dailyRate: .105,
        length: 10,
        risk_percentage: .075,
        ownerId: 2,                       
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        investment_name: 'Investment 3',
        type: 'Bond',
        amount: 20000.00,
        dailyRate: .037,
        length: 7,
        risk_percentage: .04,
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        investment_name: 'Investment 4',
        type: 'US Small-Cap',
        amount: 75000.00,
        dailyRate: .099,
        length: 8,
        risk_percentage: .017,
        ownerId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
