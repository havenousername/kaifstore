'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('webhooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      uuid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      action: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('webhooks');
  },
};
