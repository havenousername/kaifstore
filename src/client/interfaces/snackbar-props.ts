import { ReactElement, ReactNode } from 'react';
import { AlertColor, SnackbarOrigin } from '@mui/material';
import { SxProps } from '@mui/system';

export interface SnackbarProps {
  isOpen: boolean;
  changeIsOpen: (b: boolean) => void;
  innerComponent?: ReactElement<any, any>;
  severity?: AlertColor;
  message: string | ReactNode;
  snackbarOrigin?: SnackbarOrigin;
  autoHide?: number;
  alertSx?: SxProps;
}
