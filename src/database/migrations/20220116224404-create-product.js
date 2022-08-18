'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const productMeasures = require('../../interfaces/product-measure.enum');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const productTypes = require('../../interfaces/product-type.enum');

const ProductMeasure = {
  PIECE: 'щт',
  KG: 'кг',
  LITER: 'л.',
  SQUARE_METER: 'm2',
  CUBIC_METER: 'm3',
  KIT: 'компл',
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const replaceEnum = require('../utils/replaceEnum');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('products', {
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
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        currency: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        costPrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
        // arrays
        tags: {
          type: Sequelize.ARRAY(Sequelize.STRING),
        },
        attributes: {
          type: Sequelize.ARRAY(Sequelize.STRING),
        },
        discountProhibited: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          default: false,
        },
        useParentVat: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          default: false,
        },
        variantsCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 1,
        },
        barCodes: {
          type: Sequelize.ARRAY(Sequelize.STRING),
        },
        images: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
        },
        // enums
        measurename: {
          type: Sequelize.STRING,
        },
        productType: {
          type: Sequelize.INTEGER,
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
      })
      .then(async () => {
        replaceEnum(
          'products',
          'measurename',
          'PIECE',
          Object.keys(ProductMeasure),
          queryInterface,
          'product_measures',
        );
      });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
