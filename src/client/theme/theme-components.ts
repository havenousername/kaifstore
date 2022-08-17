import { Components } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
// eslint-disable-next-line
import type {} from '@mui/lab/themeAugmentation';
import darkScrollbar from '@mui/material/darkScrollbar';

const components = (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        height: '100vh',
        color: theme.palette.text.primary,
        ...darkScrollbar(),
      },
      a: {
        color: theme.palette.text.primary,
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
        color: theme.palette.text.primary,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '1.2rem',
        color: theme.palette.text.primary,
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
        backgroundColor: theme.palette.background.default,
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: {
        borderRadius: 20,
        padding: '15px',
      },
    },
  },
  MuiCalendarPicker: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        backgroundColor: theme.palette.grey[800],
        border: `2px solid ${theme.palette.grey[500]}`,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: theme.palette.grey[500],
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
        padding: '12px 27px',
        borderRadius: 10,
        transition: 'all 0.2s ease-in',
        '&:hover': {
          backgroundColor: theme.palette.background.paper,
        },
        '&[aria-selected="true"]': {
          backgroundColor: (theme.palette.primary as SimplePaletteColorOptions)
            .main,
        },
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        fontWeight: 700,
      },
    },
  },
});

export default components;
