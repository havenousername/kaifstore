import {
  Box,
  FormControl,
  FormGroup,
  Typography,
  useTheme,
} from '@mui/material';
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
import FormInputSelect from '../../../components/input/validation/form-inputselect';
import { Discount } from '../../../../backend/model/discounts.model';
import {
  ProductMeasure,
  productMeasures,
} from '../../../interfaces/product-measure';
import BackButton from '../../../components/common/back-button';
import { useRouter } from 'next/router';
import AppCarousel from '../../../components/carousel/app-carousel';
import { CarouselProvider } from 'pure-react-carousel';
import useGetHttpUrl from '../../../hooks/use-get-http-url';
import { ProductImagesContext } from 'src/client/context/product-images.context';
import ImageChangeActions from '../../../components/image-change-actions';

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
  const router = useRouter();
  const { data: product } = useSWRImmutable<Product>(
    `v1/products/${props.productId}`,
    fetcher,
  );
  const { data: groups } = useSWRImmutable<ProductGroup[]>(
    'v1/product-groups',
    fetcher,
  );

  const { data: discounts } = useSWRImmutable<Discount[]>(
    'v1/discounts',
    fetcher,
  );

  const theme = useTheme();

  const schema = useProductSchema(t);
  const getHttpUrl = useGetHttpUrl();

  const { handleSubmit, control, setValue, watch } = useForm<EditableProduct>({
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
      measureName: ProductMeasure.PIECE,
      code: '',
      articleNumber: 0,
      description: '',
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectableGroups, setSelectableGroups] = useState<SelectValue[]>([]);
  const [selectableDiscounts, setSelectableDiscounts] = useState<SelectValue[]>(
    [],
  );
  const [productTypes] = useState<SelectValue[]>([
    { value: '1', content: t('Products.TypeStandard') },
    { value: '2', content: t('Products.TypeTobaccoMarked') },
  ]);
  const [productMeasureTypes] = useState<SelectValue[]>(
    productMeasures.map((i) => ({ content: i as string, value: i as string })),
  );

  const [images, setImages] = useState<string[]>([]);

  const hasBarcode = watch('hasBarcode');

  useEffect(() => {
    if (product && !isLoaded) {
      setValue('name', product.name);
      setValue('group', String(product.group.id));
      setValue('costPrice', product.costPrice);
      setValue('price', product.price);
      setValue('characteristics', product.characteristics);
      setValue('productType', product.productType);
      setValue('hasBarcode', !!product.barCodes && product.barCodes.length > 0);
      setValue('barCodes', product.barCodes);
      setValue('quantity', product.quantity);
      setValue('code', product.code);
      setValue('articleNumber', product.articleNumber);
      setValue('measureName', product.measureName);
      setValue('description', product.description);
      setImages(product.images);
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

  useEffect(() => {
    if (discounts) {
      const selectable = discounts.map((discount) => ({
        value: String(discount.id),
        content: discount.name,
      }));
      setSelectableDiscounts(selectable);
    }
  }, [discounts]);

  const onSubmit = (pr: EditableProduct) => console.log('submitted', pr);

  const helperProps = {
    sx: {
      fontSize: '0.75rem',
      lineHeight: '1.2',
    },
  };

  const onClickItemRemove = (slide: number) => {
    const leftImages = images.filter((_, i) => i !== slide);
    setImages(leftImages);
  };

  const changeImage = (slide: number, fileUrl: string) => {
    console.log(slide, 'slide');
    setImages((prevState) =>
      prevState.map((image, index) => (index === slide ? fileUrl : image)),
    );
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
      <BackButton
        goBack={router.back}
        text={t('Utils.GoBack')}
        sx={{ my: '1.5rem' }}
      />
      <Box marginBottom={'1.4rem'}>
        <ProductImagesContext.Provider
          value={{
            images,
            changeImage,
            removeImage: onClickItemRemove,
          }}
        >
          <CarouselProvider
            visibleSlides={1}
            totalSlides={images.length}
            naturalSlideHeight={200}
            naturalSlideWidth={200}
            orientation={'vertical'}
            infinite={true}
          >
            <AppCarousel
              items={images.map((image) => getHttpUrl(image))}
              sxRoot={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}
              sx={{ maxHeight: '400px' }}
              showPrevButton={false}
              showNextButton={false}
              dotGroupActions={ImageChangeActions}
              contentActions={ImageChangeActions}
              sxDotGroupItem={{
                flexDirection: 'column',
              }}
              sxSlider={{
                '&:first-of-type': {
                  height: '72%',
                },
              }}
              sxDot={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxHeight: '380px',
                overflowY: 'scroll',
              }}
            />
          </CarouselProvider>
        </ProductImagesContext.Provider>
      </Box>
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
              {t('Products.Characteristics')}
            </Typography>
            <FormMultiselect
              name={'characteristics'}
              control={control}
              selectProps={{
                values: product.characteristics?.map((i) => ({
                  content: i,
                  value: i,
                })),
                noElements: t('Products.NoCharacteristics'),
                placeholder: t('Placeholder.Characteristics'),
              }}
            />
          </FormGroup>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.ProductType')}
            </Typography>
            <FormSelect<EditableProduct>
              name={'productType'}
              control={control}
              selectProps={{
                values: productTypes,
              }}
              helperProps={helperProps}
            />
          </FormGroup>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.HasBarcodes')}
            </Typography>
            <FormInputSelect<EditableProduct, boolean>
              sx={{
                mt: '0.1rem',
              }}
              name={'hasBarcode'}
              control={control}
              helperProps={helperProps}
              options={[
                { content: 'No', value: false },
                { content: 'Yes', value: true },
              ]}
            />
          </FormGroup>
          <FormGroup
            sx={{
              flexBasis: '48%',
              pointerEvents: hasBarcode ? 'initial' : 'none',
              '& > *': {
                color: hasBarcode ? 'common.white' : 'grey.500',
              },
            }}
          >
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.Barcodes')}
            </Typography>
            <FormMultiselect
              name={'barCodes'}
              control={control}
              selectProps={{
                values: product.barCodes?.map((i) => ({
                  content: i,
                  value: i,
                })),
                noElements: t('Products.NoBarcodes'),
                placeholder: t('Placeholder.Barcodes'),
                sxInput: {
                  '& input': {
                    color: hasBarcode
                      ? 'common.white'
                      : theme.palette.grey[500] + ' !important',
                    opacity: hasBarcode ? '1' : '0.4',
                  },
                },
                sxTag: {
                  width: '5rem',
                  height: '2.5rem',
                  '& > *': {
                    color: hasBarcode ? 'common.white' : 'grey.500',
                  },
                },
              }}
            />
          </FormGroup>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.Quantity')}
            </Typography>
            <FormInput<EditableProduct>
              name={'quantity'}
              control={control}
              inputProps={{
                placeholder: t('Products.Quantity'),
                sx: {
                  fontSize: '0.8rem',
                },
              }}
              helperProps={helperProps}
            />
          </FormGroup>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.ProductMeasure')}
            </Typography>
            <FormSelect<EditableProduct>
              name={'measureName'}
              control={control}
              selectProps={{
                values: productMeasureTypes,
              }}
              helperProps={helperProps}
            />
          </FormGroup>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.Code')}
            </Typography>
            <FormInput<EditableProduct>
              name={'code'}
              control={control}
              inputProps={{
                placeholder: t('Products.Code'),
                sx: {
                  fontSize: '0.8rem',
                },
              }}
              helperProps={helperProps}
            />
          </FormGroup>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.Article')}
            </Typography>
            <FormInput<EditableProduct>
              name={'code'}
              control={control}
              inputProps={{
                placeholder: t('Products.Article'),
                sx: {
                  fontSize: '0.8rem',
                },
              }}
              helperProps={helperProps}
            />
          </FormGroup>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.Discounts')}
            </Typography>
            <FormMultiselect<EditableProduct>
              name={'discounts'}
              control={control}
              selectProps={{
                values: selectableDiscounts,
                noElements: t('Products.NoDiscounts'),
                placeholder: t('Placeholder.Discounts'),
                disableOptionAddition: true,
                sxTag: {
                  width: '5rem',
                  height: '2.5rem',
                  '& .MuiTypography-root': {
                    fontSize: '0.6rem',
                  },
                },
              }}
              helperProps={helperProps}
            />
          </FormGroup>
          <FormGroup sx={{ flexBasis: '48%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.AllowedToSell')}
            </Typography>
            <FormInputSelect<EditableProduct, boolean>
              sx={{
                mt: '0.1rem',
              }}
              name={'allowToSell'}
              control={control}
              helperProps={helperProps}
              options={[
                { content: 'No', value: false },
                { content: 'Yes', value: true },
              ]}
            />
          </FormGroup>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <FormGroup sx={{ flexBasis: '100%' }}>
            <Typography variant={'h5'} component={'h5'} fontWeight={600}>
              {t('Products.Description')}
            </Typography>
            <FormInput<EditableProduct>
              name={'description'}
              control={control}
              appInputProps={{
                sx: {
                  maxHeight: '7rem !important',
                  '& .MuiInputBase-input': {
                    height: '100%',
                  },
                },
              }}
              inputProps={{
                placeholder: t('Products.Description'),
                inputComponent: 'textarea',
                rows: 3,
              }}
              helperProps={helperProps}
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
