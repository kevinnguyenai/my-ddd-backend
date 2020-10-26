'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('productions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.UUID, 
        defaultValue: Sequelize.UUIDV4 
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_price: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      product_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      product_img: {
        type: Sequelize.BLOB,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productions');
  }
};