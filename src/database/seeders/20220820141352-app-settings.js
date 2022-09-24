'use strict';

module.exports = {
  up: async (queryInterface) => {
    const settings = {
      id: 1,
      language: 'ru',
      moyskladIntegration: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return queryInterface.bulkInsert('app-settings', [settings]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('app-settings', null);
  },
};
