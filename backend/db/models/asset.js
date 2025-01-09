'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asset.belongsToMany(models.User, {through: models.Liability, foreignKey: 'assetId'})
      Asset.belongsTo(models.User, {as: "Owner", foreignKey: 'ownerId', onDelete: 'CASCADE'})
      Asset.belongsTo(models.Investment, {foreignKey: 'investmentId', onDelete: 'CASCADE'})

    }
  }
  Asset.init({
    asset_name: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    net_assets: DataTypes.DECIMAL,
    net_deficiency: DataTypes.DECIMAL,
    ownerId: DataTypes.INTEGER,
    liabilityId: DataTypes.INTEGER,
    investmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};