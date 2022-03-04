import Fade from '@mui/material/Fade';
import { Box, Popper, PopperPlacementType, styled } from '@mui/material';
import React, { MutableRefObject, ReactNode, useRef } from 'react';
import useOnClickOutside from '../hooks/use-on-click-outside';
import { SxProps } from '@mui/system';

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
  handleOpen,
  ignoreClickElements,
  sxRoot,
}: {
  id: string;
  open: boolean;
  anchorEl: null | HTMLElement;
  children: ReactNode;
  placement?: PopperPlacementType;
  modifiers?: unknown[];
  handleOpen?: (b: boolean, e: Event) => void;
  ignoreClickElements?: MutableRefObject<HTMLElement>[];
  sxRoot?: SxProps;
}) => {
  const dropdownRef = useRef();

  useOnClickOutside(
    dropdownRef,
    (e) => handleOpen(false, e),
    ignoreClickElements,
  );

  return (
    <>
      <Popper
        id={id}
        ref={dropdownRef}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        modifiers={modifiers}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <StyledPopperContent sx={sxRoot}>{children}</StyledPopperContent>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default DropdownPopper;
