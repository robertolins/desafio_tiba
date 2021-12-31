'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.hasMany(models.ProductSale, {
        foreignKey: 'sale_id',
        as: 'sales_products'
      });
      Sale.belongsToMany(models.Product, { 
        through: models.ProductSale,
        foreignKey: 'sale_id',
        as: 'products',
        uniqueKey: 'id'
      });
    }
  };
  Sale.init({
    client: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Sale',
    tableName: 'sales',
    createdAt: 'created_at',
    updatedAt: false
  });
  return Sale;
};