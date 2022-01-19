'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alcohol-products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      alcoCodes: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      alcoholByValue: {
        type: Sequelize.INTEGER,
      },
      alcoholProductKindCode: {
        type: Sequelize.SMALLINT,
        default: 0,
      },
      tareVolume: {
        type: Sequelize.SMALLINT,
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
