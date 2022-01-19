'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      streetNumber: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      postNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      apartmentFloor: {
        type: Sequelize.SMALLINT,
      },
      apartmentRing: {
        type: Sequelize.STRING,
      },
      remarks: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('addresses');
  },
};
