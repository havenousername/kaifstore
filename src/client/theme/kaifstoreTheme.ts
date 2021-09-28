import kaifStoreColors from './kaifstoreColors';
import { ThemeOptions } from '@mui/material';

const kaifstoreTheme: ThemeOptions = {
  palette: {
    primary: {
      light: kaifStoreColors.violetLight,
      main: kaifStoreColors.violetDark,
      dark: kaifStoreColors.violetDark,
      contrastText: kaifStoreColors.white,
    },
    grey: {
      50: kaifStoreColors.whiteAlmost,
      100: kaifStoreColors.whiteGray,
      500: kaifStoreColors.gray,
      700: kaifStoreColors.grayBackground,
      800: kaifStoreColors.blackAlmost,
    },
    success: {
      light: kaifStoreColors.greenDark,
      main: kaifStoreColors.greenDark,
      dark: kaifStoreColors.greenDark,
      contrastText: kaifStoreColors.black,
    },
    error: {
      light: kaifStoreColors.roseLight,
      main: kaifStoreColors.roseDark,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100vh',
          color: kaifStoreColors.white,
        },
      },
    },
  },
};

export default kaifstoreTheme;
