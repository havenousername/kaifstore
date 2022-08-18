'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alcohol_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      excise: {
        type: Sequelize.BOOLEAN,
      },
      alcoCodes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      strength: {
        type: Sequelize.FLOAT,
      },
      type: {
        type: Sequelize.SMALLINT,
        default: 0,
      },
      volume: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('alcohol-products');
  },
};
