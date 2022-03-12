import { Box, useTheme } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { AppInputSelect } from '../../interfaces/input-props';
import { alpha } from '@mui/system/colorManipulator';

const InputSelect: <Type>(props: AppInputSelect<Type>) => JSX.Element = ({
  options,
  selected,
  onChange,
  sxRoot,
  sxItem,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        ...sxRoot,
      }}
    >
      {options.map((option, index) => (
        <Box
          key={index}
          sx={{
            cursor: 'pointer',
            borderRadius: '20px',
            maxWidth: '200px',
            width: '100%',
            px: '2rem',
            py: '1rem',
            transition: 'all 0.2s ease-in',
            mx: '0.5rem',
            fontWeight: '700',
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.contrastText, 0.6),
            },
            '&[aria-selected="true"]': {
              backgroundColor: 'secondary.contrastText',
            },
            ...sxItem,
          }}
          onClick={() => onChange(option.value, option.content)}
          aria-selected={isEqual(selected, option.value)}
        >
          {option.content}
        </Box>
      ))}
    </Box>
  );
};

export default InputSelect;
