'use strict';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { QueryInterface } from 'sequelize/types/lib/query-interface';

module.exports = {
  /**
   *
   * @param {object} queryInterface
   * @param Sequelize
   * @return {Promise<void>}
   */
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('discounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      amount: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(200),
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
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
    await queryInterface.dropTable('discounts');
  },
};
