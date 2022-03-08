import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { FC, forwardRef, SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarProps } from '../interfaces/snackbar-props';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AppSnackbar: FC<SnackbarProps> = ({
  isOpen,
  changeIsOpen,
  innerComponent,
  severity,
  message,
  autoHide,
  alertSx,
  snackbarOrigin = { vertical: 'top', horizontal: 'center' },
}) => {
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    changeIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHide ?? 3000}
      onClose={handleClose}
      anchorOrigin={snackbarOrigin}
    >
      {innerComponent ?? (
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: '100%',
            borderRadius: '20px',
            fontWeight: 700,
            ...alertSx,
          }}
        >
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default AppSnackbar;
