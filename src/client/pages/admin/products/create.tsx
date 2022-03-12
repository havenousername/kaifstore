import { Box, useTheme } from '@mui/material';
import { NextPageWithLayout } from '../../../interfaces/pages-layout';
import React, { ReactElement, useState } from 'react';
import AdminTheme from '../../../components/functional/admin-theme';
import AppLayout from '../../../components/functional/app-layout';
import { useTranslation } from 'react-i18next';
import useProductFormData from '../../../hooks/use-product-form-data';
import ProductForm from '../../../components/product-form';
import AppBaseButton from '../../../components/common/app-base-button';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { EditableProduct } from '../../../interfaces/product-editable';
import useProductFetchCall from '../../../hooks/use-product-fetch-call';

const ProductCreate: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const {
    form: { handleSubmit, control, watch },
    productTypes,
    productMeasureTypes,
    selectableGroups,
    selectableDiscounts,
  } = useProductFormData();
  const [images, setImages] = useState<string[]>([]);

  const theme = useTheme();

  const [createProduct] = useProductFetchCall('create');

  const onInvalidSubmit = (errors: FieldErrors<EditableProduct>) => {
    console.error(errors);
  };

  const onSubmit = (pr: EditableProduct) => createProduct({ ...pr }, images);

  return (
    <Box>
      <ProductForm
        selectableGroups={selectableGroups}
        selectableDiscounts={selectableDiscounts}
        productTypes={productTypes}
        productMeasureTypes={productMeasureTypes}
        images={images}
        setImages={setImages}
        footer={
          <>
            <AppBaseButton
              variant={'contained'}
              type={'button'}
              onClick={handleSubmit(onSubmit, onInvalidSubmit)}
            >
              {t('Products.Create')}
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
              {t('Utils.Cancel')}
            </AppBaseButton>
          </>
        }
        control={control}
        watch={watch}
      />
    </Box>
  );
};

ProductCreate.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default ProductCreate;
