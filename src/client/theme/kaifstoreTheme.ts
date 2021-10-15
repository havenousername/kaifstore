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
  typography: {
    allVariants: {
      letterSpacing: 'normal',
    },
    fontFamily: ['Coolvetica', 'sans-serif'].join(','),
    h1: {
      fontWeight: 'bold',
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: kaifStoreColors.white,
      letterSpacing: '0.2rem',
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '2.25rem',
      lineHeight: 1.3,
      color: kaifStoreColors.white,
    },
    h3: {
      fontWeight: 'normal',
      fontSize: '1.875rem',
      lineHeight: 1.5,
      color: kaifStoreColors.white,
    },
    h4: {
      fontWeight: 'normal',
      fontSize: '1.5rem',
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 'normal',
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 'bold',
      fontSize: '0.874rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 'normal',
      fontSize: '0.5rem',
      lineHeight: 1.5,
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
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          color: kaifStoreColors.white,
        },
      },
    },
  },
};

export default kaifstoreTheme;
