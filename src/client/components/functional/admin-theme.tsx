import { FC } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import kaifstoreColors from '../../theme/kaifstore-colors';
import useAppTheme from '../../hooks/use-app-theme';
import components from '../../theme/theme-components';

const AdminTheme: FC = ({ children }) => {
  const theme = useAppTheme();
  const innerTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        light: kaifstoreColors.adminBlueLight,
        main: kaifstoreColors.adminBlue,
        dark: kaifstoreColors.adminBlueDark,
        contrastText: '#ffffff',
      },
      background: {
        default: kaifstoreColors.blackGrayBackground,
        paper: kaifstoreColors.adminBlueDark,
      },
    },
  });

  innerTheme.components = components(innerTheme);
  return <ThemeProvider theme={innerTheme}>{children}</ThemeProvider>;
};

export default AdminTheme;
