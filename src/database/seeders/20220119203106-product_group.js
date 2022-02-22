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
        uuid: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Баллон',
        description:
          'Аксесуары - группа товаров, а ' +
          '"главные, страшно полезные и к применению обязательные детали или принадлежности чего-либо.' +
          ' Служат для пущей красоты этого самого "чего-либо", и необходимы для создания неповторимого образа кого-либо',
        uuid: '8bc0c9c7-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Горелка',
        description: '',
        uuid: '8bc0c9c6-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Ёршик',
        description: '',
        uuid: '8bc0c9c5-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Капсула',
        description: '',
        uuid: '8bc0c9c4-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Плитка',
        description: '',
        uuid: '8bc0c9cd-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'СУМКА ДЛЯ КАЛЬЯНА',
        description: '',
        uuid: '8bc0c9c9-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'УЛОВИТЕЛЬ ТАБАКА',
        description: '',
        uuid: '8bc0c9d8-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Шило-Вилки',
        description: '',
        uuid: '8bc0c9ca-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9aa-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Бестабачные смеси',
        uuid: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Brusko',
        uuid: '357d4a5b-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'BRUSKO 250гр',
        uuid: '357d4a5e-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5b-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'BRUSCO Medium 50гр',
        uuid: '357d4a5d-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5b-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Chabacco',
        uuid: '357d4a5f-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'CHABACCO 50гр',
        uuid: '357d4a61-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5f-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Chabacco Medium 200гр',
        uuid: '357d4a60-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5f-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Daly 50гр',
        uuid: '357d4a62-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'DO YOU 50гр',
        uuid: '357d4a63-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'DUFT INTRO 50гр',
        uuid: '357d4a66-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'SPACE SMOKE 30гр',
        uuid: '357d4a64-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'TABU',
        uuid: 'b91af921-3e52-11ec-836f-7c8ae156c759',
        description:
          'Это группа товаров нужные для заполнения кальяна определенными вкусовыми качествами',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a5a-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Вейп',
        uuid: '357d4a37-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Brusko Minican',
        uuid: '357d4a35-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a37-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Smok  PoD',
        uuid: '357d4a2e-22cb-11ec-836b-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a37-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Suorin Набор',
        uuid: '698aeda6-326b-11ec-836f-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a37-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Допы к кальяну',
        description: 'Дополнительные аксессуары к кальяну',
        uuid: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'ЗАЩИТНАЯ СЕТКА',
        uuid: '8bc0c9ae-2359-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Колпак',
        uuid: '8bc0c9c1-2359-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Корзинка',
        uuid: '8bc0c9c2-2359-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Мундштуки',
        uuid: '8bc0c9d6-2359-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Накладки',
        uuid: 'cd94e09a-235f-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'ДЛЯ КАЛЬЯНA  HOOB STIK',
        uuid: '8bc0c9d7-2359-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9d6-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Подставка Pizduk accessories',
        uuid: '8bc0c9af-2359-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'ПРУЖИНКА Для шланга',
        uuid: '8bc0c9cb-2359-11ec-836d-7c8ae156c759',
        description:
          'Это группа товаров - электронных устройств, генерирующих высокодисперсный аэрозоль, который вдыхает пользователь.',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Жидкость',
        description: 'Жидкость на солевом никотине для электронных устройств',
        uuid: '357d4a52-22cb-11ec-836b-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'BIG BRO',
        uuid: '357d4a54-22cb-11ec-836b-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Brusko',
        uuid: '357d4a56-22cb-11ec-836b-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Brusko 2%',
        uuid: '357d4a55-22cb-11ec-836b-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a56-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Brusko 5%',
        uuid: '357d4a53-22cb-11ec-836b-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a56-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'CARBON',
        uuid: '357d4a57-22cb-11ec-836b-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'HOLY SHIT',
        uuid: '357d4a58-22cb-11ec-836b-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Husky Malaysian',
        uuid: '1d53f81d-4d40-11ec-8370-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Jam Monster',
        uuid: '9c877670-4456-11ec-8370-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Maxwells',
        uuid: '9c87766f-4456-11ec-8370-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Schizophrenia',
        uuid: '9c87766e-4456-11ec-8370-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'ZOMBIE PARTY',
        uuid: '357d4a59-22cb-11ec-836b-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Никобустер',
        uuid: '9c877671-4456-11ec-8370-7c8ae156c759',
        description: 'Жидкость на солевом никотине для электронных устройств',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '357d4a52-22cb-11ec-836b-7c8ae156c759',
      },
      {
        name: 'Кальяны',
        description: 'Аппарат предназначенный для курения',
        uuid: '8bc0c9b0-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'ALPHA HOOKAH',
        uuid: '8bc0c9b1-2359-11ec-836d-7c8ae156c759',
        description: 'Аппарат предназначенный для курения',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Batya',
        uuid: '8bc0c9b2-2359-11ec-836d-7c8ae156c759',
        description: 'Аппарат предназначенный для курения',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Bodo',
        uuid: '8bc0c9b8-2359-11ec-836d-7c8ae156c759',
        description: 'Аппарат предназначенный для курения',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'CAESAR',
        uuid: '8bc0c9b3-2359-11ec-836d-7c8ae156c759',
        description: 'Аппарат предназначенный для курения',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'CONCEPTIC',
        uuid: '8bc0c9b4-2359-11ec-836d-7c8ae156c759',
        description: 'Аппарат предназначенный для курения',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'FOX',
        uuid: '8bc0c9b5-2359-11ec-836d-7c8ae156c759',
        description: 'Аппарат предназначенный для курения',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        groupId: '8bc0c9ac-2359-11ec-836d-7c8ae156c759',
      },
      {
        name: 'Комплектующие',
        description: 'Комплектующие к кальяну',
        uuid: '8bc0c9ab-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Напитки',
        description: 'Прохлодительные напитки',
        uuid: '8c39c8f5-5101-11ec-8370-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Одноразовые сигареты',
        description: 'Одноразовые электронные сигареты',
        uuid: '357d4a38-22cb-11ec-836b-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Разное',
        description: 'Дополнительные аксессуары к кальяну и не только',
        uuid: '8bc0c9ad-2359-11ec-836d-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Табак',
        description: 'Табачная кальянная смесь предназначенная для курения',
        uuid: '357d4a67-22cb-11ec-836b-7c8ae156c759',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      {
        name: 'Уголь',
        description: 'Уголь для кальяна',
        uuid: '8bc0c9a9-2359-11ec-836d-7c8ae156c759',
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
