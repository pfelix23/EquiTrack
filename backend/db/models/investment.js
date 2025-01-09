'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Investment.belongsTo(models.User, {as:'Owner', foreignKey: 'ownerId', onDelete:'CASCADE'})
      Investment.hasMany(models.Liability, {foreignKey: 'investmentId'})
      Investment.hasMany(models.Asset, {foreignKey: 'investmentId'})    
    }
  }
  Investment.init({
    investment_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    ROR: DataTypes.DECIMAL,
    length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    risk_percentage: DataTypes.DECIMAL,
    projection: DataTypes.DECIMAL,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investment',
  });
  return Investment;
};