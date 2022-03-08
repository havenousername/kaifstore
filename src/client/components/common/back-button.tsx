import { ReactComponent as GoBackIcon } from '../../assets/icons/left-arrow.svg';
import { Box, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

const BackButton = ({
  goBack,
  text,
  sx,
}: {
  goBack: () => void;
  text: string;
  sx?: SxProps;
}) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      sx={{
        cursor: 'pointer',
        ...sx,
      }}
      onClick={goBack}
    >
      <GoBackIcon />
      <Typography variant={'h5'} component={'h5'} marginLeft={2}>
        {text}
      </Typography>
    </Box>
  );
};

export default BackButton;
