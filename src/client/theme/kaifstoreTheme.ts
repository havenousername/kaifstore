import kaifStoreColors from './kaifstoreColors';
import { ThemeOptions } from '@mui/material';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';

const kaifstoreTheme: ThemeOptions = {
  palette: {
    background: {
      default: kaifStoreColors.blackGrayBackground,
      paper: kaifStoreColors.violetDarkOpaque,
    },
    primary: {
      light: kaifStoreColors.violetLight,
      main: kaifStoreColors.violetDark,
      dark: kaifStoreColors.violetDark,
      contrastText: kaifStoreColors.white,
    },
    text: {
      primary: kaifStoreColors.white,
      secondary: kaifStoreColors.grayText,
    },
    grey: {
      50: kaifStoreColors.whiteAlmost,
      100: kaifStoreColors.whiteGray,
      300: kaifStoreColors.grayText,
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
      fontWeight: 'bolder',
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
    caption: {
      color: kaifStoreColors.white,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100vh',
          color: kaifStoreColors.white,
        },
        a: {
          color: kaifStoreColors.white,
          textDecoration: 'none',
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '1.2rem',
          color: kaifStoreColors.white,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: kaifStoreColors.blackGrayBackground,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {},
      },
    },
  },
};

kaifstoreTheme.components.MuiDivider = {
  styleOverrides: {
    root: {
      borderColor: kaifstoreTheme.palette.grey[500],
    },
  },
};

kaifstoreTheme.components.MuiTypography = {
  styleOverrides: {
    root: {
      color: kaifstoreTheme.palette.text.primary,
    },
  },
};

kaifstoreTheme.components.MuiMenuItem = {
  styleOverrides: {
    root: {
      color: kaifstoreTheme.palette.text.primary,
      padding: '12px 27px',
      borderRadius: 10,
      transition: 'all 0.2s ease-in',
      '&:hover': {
        backgroundColor: kaifstoreTheme.palette.background.paper,
      },
      '&[aria-selected="true"]': {
        backgroundColor: (
          kaifstoreTheme.palette.primary as SimplePaletteColorOptions
        ).main,
      },
    },
  },
};

export default kaifstoreTheme;
