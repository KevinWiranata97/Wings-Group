'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Login.init({
   user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "userName is required" },
        notEmpty: { msg: "userName is required" }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};