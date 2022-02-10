import { createTheme, ThemeProvider } from '@mui/material';
import palette from '../theme/theme-palette';
import typography from '../theme/theme-typography';
import { ReactNode } from 'react';
import components from '../theme/theme-components';

const AppTheme = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    palette,
    typography: typography(palette),
  });

  theme.components = components(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
