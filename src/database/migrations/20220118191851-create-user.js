'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const genders = require('../../interfaces/gender.enum');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const replaceEnum = require('../utils/replaceEnum');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        photo: {
          type: Sequelize.STRING,
        },
        birthDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'roles', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: false,
        },
        addressId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'addresses',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        replaceEnum(
          'users',
          'gender',
          'male',
          ['male', 'female'],
          queryInterface,
          'gender',
        ),
      );
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
