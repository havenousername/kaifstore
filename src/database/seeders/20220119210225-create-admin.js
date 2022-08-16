// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const password = await bcrypt.hash('123456789', 5);

    const admin = {
      email: 'Kaela_Sanford6@yahoo.com',
      password,
      firstName: 'Kaela',
      lastName: 'Sanford',
      gender: 'female',
      birthDate: new Date().toISOString(),
      roleId: 1,
      addressId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return queryInterface.bulkInsert('users', [admin], {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
