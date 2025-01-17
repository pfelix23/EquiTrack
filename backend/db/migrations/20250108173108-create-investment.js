'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;    // define your schema 
  // in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Investments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      investment_name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      ROR: {
        type: Sequelize.DECIMAL
      },
      length: {
        type: Sequelize.STRING
      },
      risk_percentage: {
        type: Sequelize.DECIMAL
      },
      projection: {
        type: Sequelize.DECIMAL
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Investments', options);
  }
};