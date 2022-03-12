import { SxProps } from '@mui/system';
import { AlertColor, SnackbarOrigin } from '@mui/material';
import { createContext } from 'react';

export interface SnackbarContext {
  changeIsOpen(b: boolean): void;
  changeMessage(b: string): void;
  changeAutoHide(b: number): void;
  changeAlertSx(sx: SxProps): void;
  changeOrigin(so: SnackbarOrigin): void;
  changeSeverity(s: AlertColor): void;
  isOpen: boolean;
}

const sampleSnackbarContext: SnackbarContext = {
  changeIsOpen: () => null,
  changeMessage: () => null,
  changeAutoHide: () => null,
  changeAlertSx: () => null,
  changeOrigin: () => null,
  changeSeverity: () => null,
  isOpen: false,
};

export const SnackbarContext = createContext(sampleSnackbarContext);
