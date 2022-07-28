'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction_Headers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      document_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      document_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model:'Logins',
          key:'user'
        }
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction_Headers');
  }
};