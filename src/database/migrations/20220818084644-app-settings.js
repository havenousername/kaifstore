'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('app-settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      language: {
        allowNull: false,
        type: Sequelize.STRING,
        default: 'ru',
      },
      moyskladIntegration: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        default: false,
      },
      moyskladEmail: {
        type: Sequelize.STRING,
      },
      moyskladPassword: {
        type: Sequelize.STRING,
      },
      moyskladSync: {
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('app-settings');
  },
};
