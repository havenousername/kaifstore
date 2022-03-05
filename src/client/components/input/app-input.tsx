import { InputBase, styled, TextField } from '@mui/material';
import { AppInputProps } from 'src/client/interfaces/input-props';

export const StandardInput = styled(InputBase, {
  overridesResolver: (props, styles) => [styles.input],
})(({ theme }) => ({
  'input::placeholder': {
    color: theme.palette.common.white,
    opacity: 0.7,
  },
  '&:hover': {
    'input::placeholder': {
      color: theme.palette.common.white,
      opacity: 1,
    },
  },
  '&': {
    width: '100%',
    border: `2px solid ${theme.palette.grey['500']}`,
    borderRadius: '0.8rem',
    paddingLeft: '1.3rem',
    paddingRight: '1.3rem',
    paddingTop: '0.7rem',
    paddingBottom: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    maxHeight: '3rem',
  },
  '& .MuiSvgIcon-root': {},
  '& .MuiInputBase-input': {
    width: '100%',
    overflow: 'hidden',
    paddingLeft: '1rem',
    color: theme.palette.primary.contrastText,
    backgroundColor: 'transparent',
    fontFamily: ['Coolvetica', 'sans-serif'].join(','),
    fontWeight: 'bold',
    borderRadius: '0.6rem',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
  },
}));

export const StandardTextField = styled(TextField, {
  overridesResolver: (props, styles) => [styles.input],
})(({ theme }) => ({
  'input::placeholder': {
    color: theme.palette.common.white,
    opacity: 0.7,
  },
  '&:hover': {
    'input::placeholder': {
      color: theme.palette.common.white,
      opacity: 1,
    },
  },
  '& .MuiInputBase-root': {
    width: '100%',
    borderRadius: '0.8rem',
    paddingLeft: '1.3rem',
    paddingRight: '1.3rem',
    paddingTop: '0.7rem',
    paddingBottom: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    maxHeight: '3rem',
    '&:hover': {
      border: 'none',
    },
    '& fieldset': {
      border: `2px solid ${theme.palette.grey['500']}`,
      borderColor: `${theme.palette.grey['500']} !important`,
    },
  },
  '& .MuiSvgIcon-root': {},
  '& .MuiInputBase-input': {
    width: '100%',
    overflow: 'hidden',
    paddingLeft: '1rem',
    color: theme.palette.primary.contrastText,
    backgroundColor: 'transparent',
    fontFamily: ['Coolvetica', 'sans-serif'].join(','),
    fontWeight: 'bold',
    borderRadius: '0.6rem',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
  },
}));

const AppInput = (props: AppInputProps) => {
  return <StandardInput {...props.inputProps} sx={props.sx} />;
};

export default AppInput;
