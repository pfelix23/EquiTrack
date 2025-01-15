'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Liability.belongsToMany(models.User, {through: models.Asset, foreignKey: 'liabilityId'})
      Liability.belongsTo(models.User, {as: "Owner", foreignKey: 'ownerId', onDelete: 'CASCADE'})
      Liability.belongsTo(models.Investment, {foreignKey: 'investmentId', onDelete: 'CASCADE'})
    }
  }
  Liability.init({
    liability_name: {
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
    net_assets: {
      type: DataTypes.DECIMAL
    },
    net_deficiency: {
      type: DataTypes.DECIMAL
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assetId: DataTypes.INTEGER,
    investmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Liability',
  });
  return Liability;
};