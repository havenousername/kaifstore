import { Box, FormControl, FormGroup, Typography } from '@mui/material';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import AdminTheme from '../../../components/functional/admin-theme';
import AppLayout from '../../../components/functional/app-layout';
import { useTranslation } from 'react-i18next';
import useSWRImmutable from 'swr/immutable';
import { Product } from '../../../../backend/model/products.model';
import fetcher from '../../../api/root-fetcher';
import { NextPageWithLayout } from '../../../interfaces/pages-layout';
import { useForm } from 'react-hook-form';
import { EditableProduct } from '../../../interfaces/product-editable';
import { yupResolver } from '@hookform/resolvers/yup';
import useProductSchema from '../../../hooks/use-product-schema';
import FormInput from '../../../components/input/validation/form-input';
import FormSelect from '../../../components/input/validation/form-select';
import { ProductGroup } from '../../../../backend/model/product-groups.model';
import { SelectValue } from '../../../interfaces/input-props';
import FormMultiselect from '../../../components/input/validation/form-multiselect';

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
  const { data: groups } = useSWRImmutable<ProductGroup[]>(
    'v1/product-groups',
    fetcher,
  );

  const schema = useProductSchema(t);

  const { handleSubmit, control, setValue } = useForm<EditableProduct>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      price: 1,
      costPrice: 0,
      group: '',
      characteristics: [],
      quantity: 1,
      barCodes: [],
      productType: 0,
      allowToSell: true,
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectableGroups, setSelectableGroups] = useState<SelectValue[]>([]);

  useEffect(() => {
    if (product && !isLoaded) {
      setValue('name', product.name);
      setValue('group', String(product.group.id));
      setValue('costPrice', product.costPrice);
      setValue('price', product.price);
      setValue('characteristics', product.characteristics);
      setIsLoaded(true);
    }
  }, [isLoaded, product, setValue]);

  useEffect(() => {
    if (groups) {
      const selectable = groups.map((group) => ({
        value: String(group.id),
        content: group.name,
      }));
      setSelectableGroups(selectable);
    }
  }, [groups]);

  const onSubmit = (pr: EditableProduct) => console.log('submitted', pr);

  const helperProps = {
    sx: {
      fontSize: '0.75rem',
      lineHeight: '1.2',
    },
  };

  if (!product) {
    return <></>;
  }

  return (
    <Box
      sx={{
        padding: '1rem 8rem 4rem',
      }}
    >
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {t('Products.Products')}
      </Typography>
      <FormControl
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '100%' }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.ProductName')}*
            </Typography>
            <FormInput<EditableProduct>
              name={'name'}
              control={control}
              inputProps={{
                placeholder: t('Products.ProductName'),
                sx: {
                  fontSize: '0.8rem',
                },
                required: true,
              }}
              helperProps={helperProps}
            />
          </FormGroup>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.ProductGroup')}*
            </Typography>
            <FormSelect<EditableProduct>
              name={'group'}
              control={control}
              selectProps={{
                values: selectableGroups,
              }}
              helperProps={helperProps}
            />
          </FormGroup>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.ProductCostPrice')}*
            </Typography>
            <FormInput<EditableProduct>
              name={'costPrice'}
              control={control}
              inputProps={{
                placeholder: t('Products.ProductCostPrice'),
                sx: {
                  fontSize: '0.8rem',
                },
                type: 'number',
              }}
              helperProps={helperProps}
            />
          </FormGroup>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.ProductPrice')}*
            </Typography>
            <FormInput<EditableProduct>
              name={'price'}
              control={control}
              inputProps={{
                placeholder: t('Products.ProductPrice'),
                sx: {
                  fontSize: '0.8rem',
                },
                type: 'number',
              }}
              helperProps={helperProps}
            />
          </FormGroup>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.Characteristics')}*
            </Typography>
            <FormMultiselect
              name={'characteristics'}
              control={control}
              selectProps={{
                values: product.characteristics?.map((i) => ({
                  content: i,
                  value: i,
                })),
                noElements: 'No characteristics',
                placeholder: 'Select characteristics',
              }}
            />
          </FormGroup>
        </Box>
      </FormControl>
    </Box>
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
