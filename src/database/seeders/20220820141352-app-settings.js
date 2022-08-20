'use strict';

module.exports = {
  up: async (queryInterface) => {
    const settings = {
      id: 1,
      language: 'ru',
      moyskladIntegration: false,
    };
    return queryInterface.bulkInsert('app-settings', [settings]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('app-settings', null);
  },
};
