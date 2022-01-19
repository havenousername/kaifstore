'use strict';

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        amount: 20,
        name: 'Новогодние скидки',
        description:
          'Новогодние скидки - самый пополярный способ привлечь аудиторию на новый год',
        availableUntil: new Date(new Date().setFullYear(2022, 1, 12)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('discounts', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('discounts', null, {});
  },
};
