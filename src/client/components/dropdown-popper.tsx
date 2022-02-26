import Fade from '@mui/material/Fade';
import { Box, Popper, PopperPlacementType, styled } from '@mui/material';
import React, { ReactNode } from 'react';

const StyledPopperContent = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.grey[500]}`,
  backgroundColor: theme.palette.grey[700],
  borderRadius: '1.25rem',
  padding: theme.spacing(2, 3),
}));

const DropdownPopper = ({
  id,
  open,
  anchorEl,
  children,
  placement = 'bottom-start',
  modifiers,
}: {
  id: string;
  open: boolean;
  anchorEl: null | HTMLElement;
  children: ReactNode;
  placement?: PopperPlacementType;
  modifiers?: unknown[];
}) => {
  return (
    <>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        modifiers={modifiers}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <StyledPopperContent>{children}</StyledPopperContent>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default DropdownPopper;
