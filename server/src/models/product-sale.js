'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductSale.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });
      ProductSale.belongsTo(models.Sale, {
        foreignKey: 'sale_id',
        as: 'sale'
      });
    }
  };
  ProductSale.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sale',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductSale',
    tableName: 'products_sales',
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
  return ProductSale;
};