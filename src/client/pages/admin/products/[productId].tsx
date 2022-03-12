import { useTheme } from '@mui/material';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import AdminTheme from '../../../components/functional/admin-theme';
import AppLayout from '../../../components/functional/app-layout';
import { useTranslation } from 'react-i18next';
import useSWRImmutable from 'swr/immutable';
import { Product } from '../../../../backend/model/products.model';
import fetcher from '../../../api/root-fetcher';
import { NextPageWithLayout } from '../../../interfaces/pages-layout';
import { EditableProduct } from '../../../interfaces/product-editable';
import AppBaseButton from '../../../components/common/app-base-button';
import useProductFetchCall from 'src/client/hooks/use-product-fetch-call';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import ProductForm from '../../../components/product-form';
import useProductFormData from '../../../hooks/use-product-form-data';

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export function getStaticProps(context) {
  return {
    props: {
      productId: context.params.productId,
    },
  };
}

const ProductDetails: NextPageWithLayout = (props: {
  productId: string;
  children?: ReactNode;
}) => {
  const { t } = useTranslation();
  const { data: product } = useSWRImmutable<Product>(
    `v1/products/${props.productId}`,
    fetcher,
  );

  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const {
    form: { handleSubmit, control, setValue, watch },
    productTypes,
    productMeasureTypes,
    selectableGroups,
    selectableDiscounts,
  } = useProductFormData();

  useEffect(() => {
    if (product && !isLoaded) {
      setValue('name', product.name);
      setValue('group', String(product.group.uuid));
      setValue('costPrice', product.costPrice);
      setValue('price', product.price);
      setValue(
        'characteristics',
        product.characteristics.map((i) => ({ content: i, value: i })),
      );
      setValue('productType', product.productType);
      setValue('hasBarcode', !!product.barCodes && product.barCodes.length > 0);
      setValue(
        'barCodes',
        product.barCodes.map((i) => ({ content: i, value: i })),
      );
      setValue('quantity', product.quantity);
      setValue('code', product.code);
      setValue('articleNumber', product.articleNumber ?? 0);
      setValue('measureName', product.measureName);
      setValue('description', product.description);
      setValue(
        'discounts',
        product.discounts.map((i) => ({
          content: i.name,
          value: String(i.id),
        })),
      );
      setValue('allowToSell', product.allowToSell);
      setImages(product.images);
      setIsLoaded(true);
    }
  }, [isLoaded, product, setValue]);

  const [updateProduct] = useProductFetchCall('change');

  const onSubmit = (pr: EditableProduct) =>
    updateProduct({ ...pr, id: product.id }, images);

  const onInvalidSubmit = (errors: FieldErrors<EditableProduct>) => {
    console.error(errors);
  };

  if (!product) {
    return <></>;
  }

  return (
    <ProductForm
      selectableGroups={selectableGroups}
      selectableDiscounts={selectableDiscounts}
      productTypes={productTypes}
      productMeasureTypes={productMeasureTypes}
      barCodes={product.barCodes.map((barCode) => ({
        value: barCode,
        content: barCode,
      }))}
      characteristics={product.characteristics.map((characteristic) => ({
        value: characteristic,
        content: characteristic,
      }))}
      images={images}
      setImages={setImages}
      footer={
        <>
          <AppBaseButton
            variant={'contained'}
            type={'button'}
            onClick={handleSubmit(onSubmit, onInvalidSubmit)}
          >
            {t('Products.Save')}
          </AppBaseButton>
          <AppBaseButton
            variant={'outlined'}
            type={'button'}
            sx={{
              marginLeft: '2rem',
              border: `1px solid ${theme.palette.error.light}`,
              '&:hover': {
                backgroundColor: theme.palette.error.light,
              },
            }}
          >
            {t('Products.Delete')}
          </AppBaseButton>
        </>
      }
      control={control}
      watch={watch}
    />
  );
};

ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default ProductDetails;
