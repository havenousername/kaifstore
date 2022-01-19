'use strict';

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        userId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('favourite-user-products', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('favourite-user-products', null);
  },
};
