import { useTranslation } from 'react-i18next';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
} from 'react';
import { SnackbarContext } from '../context/snackbar.context';
import { EditableProduct } from '../interfaces/product-editable';
import {
  Box,
  FormControl,
  FormGroup,
  Typography,
  useTheme,
} from '@mui/material';
import BackButton from './common/back-button';
import FileInput from './file-input';
import { ReactComponent as PlusAddIcon } from '../assets/icons/plus-add.svg';
import { ProductImagesContext } from '../context/product-images.context';
import { CarouselProvider } from 'pure-react-carousel';
import AppCarousel from './carousel/app-carousel';
import ImageChangeActions from './image-change-actions';
import FormInput from './input/validation/form-input';
import FormSelect from './input/validation/form-select';
import FormMultiselect from './input/validation/form-multiselect';
import FormInputSelect from './input/validation/form-inputselect';
import { useRouter } from 'next/router';
import useGetHttpUrl from '../hooks/use-get-http-url';
import { SelectValue } from '../interfaces/input-props';
import {
  Control,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form/dist/types';

const ProductForm = ({
  selectableGroups,
  selectableDiscounts,
  productTypes,
  productMeasureTypes,
  footer,
  control,
  watch,
  barCodes = [],
  characteristics = [],
  images,
  setImages,
  getValues,
}: {
  selectableGroups: SelectValue[];
  selectableDiscounts: SelectValue[];
  productTypes: SelectValue[];
  productMeasureTypes: SelectValue[];
  barCodes?: SelectValue[];
  characteristics?: SelectValue[];
  footer: ReactNode;
  control: Control<EditableProduct, any>;
  watch: UseFormWatch<EditableProduct>;
  getValues: UseFormGetValues<EditableProduct>;
  images?: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}) => {
  const { t } = useTranslation();
  const addImageRef = useRef<HTMLInputElement>(null);
  const snackbar = useContext(SnackbarContext);
  const theme = useTheme();
  const router = useRouter();
  const getHttpUrl = useGetHttpUrl();

  const hasBarcode = watch('hasBarcode');

  const helperProps = {
    sx: {
      fontSize: '0.75rem',
      lineHeight: '1.2',
    },
  };

  const onClickItemRemove = (slide: number) => {
    const leftImages = images?.filter((_, i) => i !== slide);
    if (leftImages) {
      setImages(leftImages);
    } else {
      console.error('No images to remove');
    }
  };

  const changeImage = (slide: number, fileUrl: string) => {
    setImages((prevState) =>
      prevState.map((image, index) => (index === slide ? fileUrl : image)),
    );
  };

  const onAddNewImage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!images) {
      snackbar.changeSeverity('error');
      snackbar.changeMessage('An error has occurred while uploading an image');
      return;
    }

    if (images.length > 9) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('warning');
      snackbar.changeMessage('You can not upload more than 10 images');
      return;
    }
    if (e.target instanceof HTMLInputElement && e.target.files?.[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setImages((prevState) => [...prevState, fileUrl]);
      snackbar.changeIsOpen(true);
      snackbar.changeMessage('Successfully added');
    } else {
      snackbar.changeSeverity('error');
      snackbar.changeMessage('An error has occurred while uploading an image');
    }
  };

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
        {t('Products.Products')} /{' '}
        {getValues('name') ? getValues('name') : t('Products.Create')}
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <BackButton
          goBack={router.back}
          text={t('Utils.GoBack')}
          sx={{ my: '1.5rem' }}
        />
        <FileInput
          onChangeInput={onAddNewImage}
          param={Math.round(Math.random() * 99)}
          label={
            <Box display={'flex'}>
              <PlusAddIcon />
              <Typography
                sx={{
                  color:
                    !!images && images.length > 9 ? 'grey.500' : 'common.white',
                }}
              >
                {t('Products.AddNewImage')}
              </Typography>
            </Box>
          }
          ref={addImageRef}
          sxLabel={{
            maxWidth: '250px',
            borderRadius: '10px',
            py: '0.68rem',
            px: '1.5rem',
            border:
              !!images && images.length > 9
                ? `1px solid ${theme.palette.grey[500]}`
                : `1px solid ${theme.palette.common.white}`,
            pointerEvents: !!images && images.length > 9 ? 'none' : 'initial',
          }}
        />
      </Box>
      {!!images && images.length > 0 && (
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
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column-reverse',
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
      )}
      <FormControl component={'form'} sx={{ width: '100%' }}>
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
            <FormMultiselect<EditableProduct>
              name={'characteristics'}
              control={control}
              selectProps={{
                values: characteristics,
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
            <FormMultiselect<EditableProduct>
              name={'barCodes'}
              control={control}
              selectProps={{
                values: barCodes,
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
              name={'articleNumber'}
              control={control}
              inputProps={{
                placeholder: t('Products.Article'),
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
        <Box display={'flex'} justifyContent={'flex-start'} marginTop={'2rem'}>
          {footer}
        </Box>
      </FormControl>
    </Box>
  );
};

export default ProductForm;
