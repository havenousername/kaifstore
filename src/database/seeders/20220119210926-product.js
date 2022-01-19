'use strict';

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        uuid: '8bc0c9c7-2359-11ec-836d-7c8ae156c759',
        name: 'Баллон',
        allowToSell: true,
        price: 150,
        costPrice: 60,
        quantity: 14,
        barCodes: ['4601004043084'],
        measureName: 'шт',
        productType: 0,
        groupId: '8bc0c9c5-2359-11ec-836d-7c8ae156c759',
        code: '00145',
        description: 'Крутой балон домой',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('products', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('products', null);
  },
};
