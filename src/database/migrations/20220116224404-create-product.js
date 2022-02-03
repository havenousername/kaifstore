'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const productMeasures = require('../../interfaces/product-measure.enum');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const productTypes = require('../../interfaces/product-type.enum');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      allowToSell: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      // product specific
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      characteristics: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      costPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      barCodes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      // enums
      measureName: {
        type: Sequelize.STRING,
      },
      productType: {
        type: Sequelize.STRING,
      },
      // foreign key
      groupId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'product_groups',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      alcoholId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'alcohol_products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      // additional info
      code: {
        type: Sequelize.STRING(5),
      },
      description: {
        type: Sequelize.TEXT,
      },
      articleNumber: {
        type: Sequelize.INTEGER,
      },
      tax: {
        type: Sequelize.STRING,
        defaultValue: 'NO_VAT',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
