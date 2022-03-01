import { ReactComponent as GoBackIcon } from '../assets/icons/left-arrow.svg';
import { Box, Typography } from '@mui/material';

const BackButton = ({ goBack, text }: { goBack: () => void; text: string }) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      sx={{
        cursor: 'pointer',
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
