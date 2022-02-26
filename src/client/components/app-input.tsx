import { InputBase, InputBaseProps, styled } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

const StandardInput = styled(InputBase, {
  shouldForwardProp: (prop) =>
    prop !== 'width' && prop !== 'margin' && prop !== 'sx',
  overridesResolver: (props, styles) => [styles.root],
})(({ theme }) => ({
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

type AppInputProps = {
  inputProps: InputBaseProps;
  sx?: SxProps<Theme>;
  type?: string;
};

const AppInput = (props: AppInputProps) => {
  return (
    <StandardInput {...props.inputProps} sx={props.sx} type={props.type} />
  );
};

export default AppInput;
