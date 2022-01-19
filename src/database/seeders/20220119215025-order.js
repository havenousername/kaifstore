'use strict';

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        bagId: 1,
        stage: 'Ordered',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('orders', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('orders', null);
  },
};
