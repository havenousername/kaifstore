'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        name: 'Аксессуары',
        description:
          'Аксесуары - группа товаров, а ' +
          '"главные, страшно полезные и к применению обязательные детали или принадлежности чего-либо.' +
          ' Служат для пущей красоты этого самого "чего-либо", и необходимы для создания неповторимого образа кого-либо',
        uuid: '8bc0c9c5-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Бестабачные смеси',
        uuid: '357d4a5d-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Вейп',
        uuid: '357d4a35-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Допы к кальяну',
        description: 'Дополнительные аксессуары к кальяну',
        uuid: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
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
