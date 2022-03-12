import { CardMedia, CardMediaProps, styled, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import * as React from 'react';
import { ReactComponent as NewIcon } from '../assets/icons/new.svg';

type CardMediaWithStatusesProps = {
  isFavourite: boolean;
  hasDiscount: boolean;
  isNew: boolean;
};

type ProductMediaProps = {
  newText: string;
};

const CardMediaWithStatuses = styled(
  ({
    /*eslint-disable */
     isFavourite,
     isNew,
     hasDiscount,
     /* eslint-enable */
    ...rest
  }: CardMediaProps & CardMediaWithStatusesProps) => <CardMedia {...rest} />,
)(
  ({
    isNew,
    hasDiscount,
    theme,
  }: CardMediaProps & CardMediaWithStatusesProps & { theme?: Theme }) => ({
    width: '100%',
    height: '16.875rem',
    position: 'relative',
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
            backgroundColor: theme.palette.grey[700],
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
  backgroundColor: theme.palette.grey[700],
  borderRadius: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProductMediaCard = ({
  newText,
  ...props
}: CardMediaProps & CardMediaWithStatusesProps & ProductMediaProps) => {
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
                marginRight: '0.5rem',
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
