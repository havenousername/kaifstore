import { createTheme } from '@mui/material';
import palette from '../theme/theme-palette';
import typography from '../theme/theme-typography';
import components from '../theme/theme-components';

const useAppTheme = () => {
  const theme = createTheme({
    palette,
    typography: typography(palette),
  });

  theme.components = components(theme);
  return theme;
};

export default useAppTheme;
