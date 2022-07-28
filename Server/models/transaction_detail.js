'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaction_Detail.belongsTo(models.transaction_Header,{foreignKey:'document_number'})
    }
  }
  transaction_Detail.init({
    document_code: DataTypes.STRING,
    document_number: DataTypes.STRING,
    product_code: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    sub_total: DataTypes.INTEGER,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction_Detail',
  });
  return transaction_Detail;
};