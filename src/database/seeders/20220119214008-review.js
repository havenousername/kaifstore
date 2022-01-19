'use strict';

module.exports = {
  up: async (queryInterface) => {
    const data = [
      {
        rate: 14,
        title: 'Хороший баллон',
        description: 'Мне все нравится но баллон неидеальный',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('reviews', data, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('reviews', null, {});
  },
};
