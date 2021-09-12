'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const data = Array(50)
      .fill(false)
      .map(() => {
        return {
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
          // password: faker.internet.password(),
          // firstName: faker.name.firstName(),
          // lastName: faker.name.lastName(),
          // sex: Math.random() < 0.5 ? 'male' : 'female',
          // birthDate: faker.date.past(),
        };
      });

    return queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
