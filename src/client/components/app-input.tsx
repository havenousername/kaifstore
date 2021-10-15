import { Theme } from '@mui/material';
import { InputBase, InputBaseProps } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { theme } from '../pages/_app';

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        border: `2px solid ${theme.palette.grey['500']}`,
        borderRadius: '0.8rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        display: 'flex',
        alignItems: 'center',
      },
      input: {
        width: (props: StyleProps) => props.width ?? '100%',
        overflow: 'hidden',
        color: theme.palette.primary.contrastText,
        backgroundColor: 'transparent',
        fontFamily: ['Coolvetica', 'sans-serif'].join(','),
        fontWeight: 'bold',
        padding: `0.7rem 0.8rem`,
        borderRadius: '0.6rem',
        '&:focus': {
          borderColor: theme.palette.grey['50'],
        },
        transition: theme.transitions.create([
          'border-color',
          'background-color',
          'box-shadow',
        ]),
      },
    }),
  { defaultTheme: theme },
);

type StyleProps = {
  width?: 'auto' | '100%';
};

type AppInputProps = {
  inputProps: InputBaseProps;
} & StyleProps;

const AppInput = (props: AppInputProps) => {
  const styles = useStyles({ width: props.width });
  return <InputBase {...props.inputProps} classes={styles} />;
};

export default AppInput;
