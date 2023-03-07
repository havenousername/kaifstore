'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        name: 'Без группы',
        description:
          'Продукты которые не имеют определенной группы или подгруппы попадают сюда',
        uuid: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
    ];

    return queryInterface.bulkInsert('product_groups', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('product_groups', null, {});
  },
};
