'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { QueryTypes } = require('sequelize');
/**
 * Since PostgreSQL still does not support remove values from an ENUM,
 * the workaround is to create a new ENUM with the new values and use it
 * to replace the other.
 * @param {String} tableName
 * @param {String} columnName
 * @param {String} defaultValue
 * @param {Array} newValues
 * @param {QueryInterface} queryInterface
 * @param {String} enumName - Optional
 *
 * @return {Promise}
 */
module.exports = function replaceEnum(
  tableName,
  columnName,
  defaultValue,
  newValues,
  queryInterface,
  enumName,
) {
  const newEnumName = `${enumName}_new`;
  return queryInterface.sequelize.transaction((t) => {
    // Create a copy of the type
    return (
      queryInterface.sequelize
        .query(
          `
      CREATE TYPE ${newEnumName} 
        AS ENUM ('${newValues.join("', '")}') 
    `,
          { transaction: t },
        )
        // Drop default value (ALTER COLUMN cannot cast default values)
        .then(() =>
          queryInterface.sequelize.query(
            `
          ALTER TABLE ${tableName} 
            ALTER COLUMN ${columnName}
                DROP DEFAULT
        `,
            { transaction: t },
          ),
        )
        // Change column type to the new ENUM TYPE
        .then(() =>
          queryInterface.sequelize.query(
            `
          ALTER TABLE ${tableName}
          ALTER COLUMN ${columnName}
            TYPE ${newEnumName}
            USING (${columnName}::text::${newEnumName})
        `,
            { transaction: t },
          ),
        )
        // // Drop old ENUM
        .then(async () => {
          const r = await queryInterface.sequelize.query(
            `SELECT
               T.typname,
               E.enumlabel,
               E.enumsortorder
             FROM
               pg_enum E
               INNER JOIN pg_type T ON (E.enumtypid = T.oid)
             WHERE
               T.typname = ?`,
            {
              type: QueryTypes.SELECT,
              replacements: [enumName],
            },
          );
          if (r && r.length > 0) {
            queryInterface.sequelize
              .query(
                `
                  DROP TYPE ${enumName}
                `,
                { transaction: t },
              )
              .catch(() => {
                console.error(`No need to drop enum ${enumName}. Exists: ${r}`);
              });
          }
        })
        // Rename new ENUM name
        .then(() =>
          queryInterface.sequelize.query(
            `
              ALTER TYPE ${newEnumName}
                RENAME TO ${enumName}
            `,
            { transaction: t },
          ),
        )
        .then(() =>
          queryInterface.sequelize.query(
            `
              ALTER TABLE ${tableName}
                ALTER COLUMN ${columnName}
                  SET DEFAULT '${defaultValue}'::${enumName}
            `,
            { transaction: t },
          ),
        )
    );
  });
};
