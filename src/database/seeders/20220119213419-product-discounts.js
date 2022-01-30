'use strict';

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        discountId: 1,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('product_discounts', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('product_discounts', null);
  },
};
