import { FC, useState } from 'react';
import { AlertColor, Box, SnackbarOrigin } from '@mui/material';
import AppSnackbar from './app-snackbar';
import { SnackbarContext } from '../context/snackbar.context';
import { SxProps } from '@mui/system';

const GlobalSnackbar: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const changeIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  const [message, setMessage] = useState('');
  const [alertSx, setAlertSx] = useState<SxProps>({});
  const [autoHide, setAutoHide] = useState<number>(1000);
  const [origin, setOrigin] = useState<SnackbarOrigin>({
    horizontal: 'center',
    vertical: 'top',
  });
  const [severity, setSeverity] = useState<AlertColor>('success');
  return (
    <Box>
      <AppSnackbar
        isOpen={isOpen}
        changeIsOpen={changeIsOpen}
        message={message}
        alertSx={alertSx}
        autoHide={autoHide}
        snackbarOrigin={origin}
        severity={severity}
      />
      <SnackbarContext.Provider
        value={{
          isOpen,
          changeIsOpen,
          changeAlertSx(sx: SxProps) {
            setAlertSx(sx);
          },
          changeAutoHide(n: number) {
            setAutoHide(n);
          },
          changeMessage(s: string) {
            setMessage(s);
          },
          changeOrigin(so: SnackbarOrigin) {
            setOrigin(so);
          },
          changeSeverity(s: AlertColor) {
            setSeverity(s);
          },
        }}
      >
        {children}
      </SnackbarContext.Provider>
    </Box>
  );
};

export default GlobalSnackbar;
