import { CardMedia, CardMediaProps, styled, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useState } from 'react';
import Image from 'next/image';
import { ReactComponent as NewIcon } from '../assets/icons/new.svg';

type CardMediaWithStatusesProps = {
  isFavourite: boolean;
  hasDiscount: boolean;
  isNew: boolean;
};

type ImageFallback = {
  alt: string;
  fallbackImage: string;
};

type ProductMediaProps = {
  newText: string;
};

const ImageFull = styled(Image)({
  width: '100%',
  height: '100%',
  borderRadius: '1em',
});

const CardMediaWithStatuses = styled(
  ({
    /*eslint-disable */
     isFavourite,
     isNew,
     hasDiscount,
     image,
     alt,
     fallbackImage,
    ...rest
  }: CardMediaProps & CardMediaWithStatusesProps & ImageFallback ) => {
    const [imageError, setImageError] = useState(false);
    return (
      <CardMedia {...rest}>
        <ImageFull src={imageError || !image ? fallbackImage : image} alt={alt} onError={() => setImageError(true)} layout='fill' />
      </CardMedia>
    );
  },
)(
  ({
    isNew,
    hasDiscount,
    theme,
  }: CardMediaProps & CardMediaWithStatusesProps & { theme?: Theme }) => ({
    width: '100%',
    height: '16.875rem',
    position: 'relative',
    backgroundColor: theme?.palette.grey[800],
    '&:before': () =>
      hasDiscount || isNew
        ? {
            content: `""`,
            position: 'absolute',
            right: 7,
            bottom: 15,
            maxWidth: 124,
            height: '28px',
            width: '100%',
            backgroundColor: theme?.palette.grey[700],
            borderRadius: 15,
          }
        : {},
  }),
);

const FeatureRectangle = styled('div')(({ theme }: { theme?: Theme }) => ({
  position: 'absolute',
  right: 7,
  bottom: 15,
  maxWidth: 150,
  height: '34px',
  width: '100%',
  backgroundColor: theme?.palette.grey[700],
  borderRadius: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProductMediaCard = ({
  newText,
  ...props
}: CardMediaProps & CardMediaWithStatusesProps & ProductMediaProps & ImageFallback) => {
  return (
    <>
      <CardMediaWithStatuses {...props}>
        {props.isNew && (
          <FeatureRectangle>
            <Typography
              variant={'h5'}
              component={'span'}
              fontSize={18}
              sx={{
                mr: '0.5rem',
              }}
            >
              {newText}
            </Typography>
            <NewIcon />
          </FeatureRectangle>
        )}
      </CardMediaWithStatuses>
    </>
  );
};

export default ProductMediaCard;
