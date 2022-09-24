import { TransitionProps } from '@mui/material/transitions/transition';
import React, { forwardRef, Ref, ReactElement } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
} from '@mui/material';
import AppBaseButton from './app-base-button';

const FadeTransition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) => <Fade ref={ref} {...props} />,
);

type AppDialogProps = {
  open: boolean;
  title: string;
  content: string | typeof DialogContent;
  onAgree: () => void;
  agreeText?: string;
  cancelText?: string;
  onCancel?: () => void;
  handleClose: () => void;
};

const AppDialog = ({
  open,
  title,
  content,
  onAgree,
  onCancel,
  handleClose,
  agreeText,
  cancelText,
}: AppDialogProps) => {
  return (
    <Box component={'div'}>
      <Dialog
        open={open}
        TransitionComponent={FadeTransition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        {typeof content === 'string' ? (
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        ) : (
          content
        )}
        <DialogActions>
          <AppBaseButton onClick={onCancel ? onCancel : handleClose}>
            {cancelText}
          </AppBaseButton>
          <AppBaseButton onClick={onAgree}>{agreeText}</AppBaseButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppDialog;
