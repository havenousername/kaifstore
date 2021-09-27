'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        name: 'Admin',
        description: 'App admin',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'User',
        description: 'App user',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
    ];

    return queryInterface.bulkInsert('roles', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
