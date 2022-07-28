'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_Header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction_Header.hasMany(models.transaction_Detail,{foreignKey:'document_number'})
    }
  }
  transaction_Header.init({
    document_code: DataTypes.STRING,
    document_number: DataTypes.STRING,
    user: DataTypes.STRING,
    total: DataTypes.INTEGER,
    date: DataTypes.DATE,
    product_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'transaction_Header',
  });
  return transaction_Header;
};