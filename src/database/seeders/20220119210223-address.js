'use strict';

module.exports = {
  up: async (queryInterface) => {
    const addresses = [
      {
        country: 'Молдова',
        city: 'Кищинев',
        street: 'бд. Штефан чел Маре',
        streetNumber: 45,
        postNumber: 'MD-4500',
        remarks: 'Test data',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('addresses', addresses, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('addresses', null, {});
  },
};
