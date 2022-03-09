import React, { FC, useContext, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { ProductImagesContext } from '../context/product-images.context';
import { ImageChangeProps } from '../interfaces/image-change-props';
import { useTranslation } from 'react-i18next';
import FileInput from './file-input';

const ImageChangeActions: FC<ImageChangeProps> = ({
  slide,
  sizeSx,
  canBeEdited = true,
}) => {
  const { changeImage, removeImage } = useContext(ProductImagesContext);
  const { t } = useTranslation();
  const theme = useTheme();
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      changeImage(slide, fileUrl);
    }
  };
  const changeButtonRef = useRef<HTMLInputElement>();
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      mt={0.5}
    >
      <Box
        sx={{
          p: 0,
          maxWidth: '250px',
          fontSize: '0.6rem',
          display: 'flex',
          justifyContent: 'center',
          border: `1px solid ${theme.palette.error.light}`,
          cursor: 'pointer',
          borderRadius: '5px',
          my: '0.2rem',
          textTransform: 'initial',
          ...sizeSx,
        }}
        onClick={() => removeImage(slide)}
      >
        {t('Products.Delete')}
      </Box>
      {canBeEdited && (
        <FileInput
          onChangeInput={onChangeInput}
          param={slide}
          label={t('Products.Change')}
          ref={changeButtonRef}
        />
      )}
    </Box>
  );
};

export default ImageChangeActions;
