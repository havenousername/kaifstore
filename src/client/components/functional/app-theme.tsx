import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import useAppTheme from '../../hooks/use-app-theme';

const AppTheme = ({ children }: { children: ReactNode }) => {
  const theme = useAppTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
