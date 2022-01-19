'use strict';

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        productCount: 3,
        characteristic: 'WHITE',
        productId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('bags', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('bags', null);
  },
};
