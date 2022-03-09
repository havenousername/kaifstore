import * as yup from 'yup';
import { TFunction } from 'i18next';

const useProductSchema = (t: TFunction) => {
  return yup.object({
    name: yup
      .string()
      .required(() =>
        t('Validation.Required', { field: t('Products.ProductName') }),
      )
      .min(5, () =>
        t('ValidationMinLength', {
          length: 5,
          field: t('Products.ProductName'),
        }),
      ),
    group: yup
      .string()
      .required(() =>
        t('Validation.Required', { field: t('Products.ProductGroup') }),
      ),
    price: yup
      .number()
      .required(() =>
        t('Validation.Required', { field: t('Products.ProductPrice') }),
      )
      .min(0, () =>
        t('Validation.MinLength', {
          length: 0,
          field: t('Products.ProductPrice'),
        }),
      )
      .max(1000000, () => {
        t('Validation.MaxLength', {
          length: 1000000,
          field: t('Products.ProductPrice'),
        });
      }),
    costPrice: yup
      .number()
      .required(() =>
        t('Validation.Required', { field: t('Products.ProductCostPrice') }),
      )
      .min(0, () =>
        t('Validation.MinLength', {
          length: 0,
          field: t('Products.ProductCostPrice'),
        }),
      )
      .max(1000000, () => {
        t('Validation.MaxLength', {
          length: 1000000,
          field: t('Products.ProductCostPrice'),
        });
      })
      .when('price', {
        is: (val) => val && val > 0,
        then: yup
          .number()
          .lessThan(yup.ref('price'), 'Cost price cannot be bigger than price'),
      }),
    characteristics: yup.array(),
    quantity: yup
      .number()
      .required(() =>
        t('Validation.Required', { field: t('Products.Quantity') }),
      )
      .min(0, () =>
        t('Validation.MinLength', { length: 0, field: t('Products.Quantity') }),
      ),
    hasBarcode: yup
      .boolean()
      .required(() =>
        t('Validation.Required', { field: t('Products.Barcodes') }),
      ),
    productType: yup
      .number()
      .required(() =>
        t('Validation.Required', { field: t('Products.ProductType') }),
      ),
    code: yup.string(),
    barCodes: yup.array(),
    articleNumber: yup.number().nullable(),
    discounts: yup.array().of(yup.string()),
    allowToSell: yup.boolean(),
    tax: yup.string(),
    description: yup.string(),
    images: yup.array(),
  });
};

export default useProductSchema;
