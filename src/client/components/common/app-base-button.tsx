import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)<ButtonProps>(({ theme, color }) => ({
  maxWidth: '14.375rem',
  fontWeight: '700',
  width: '100%',
  borderRadius: '0.3rem',
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor:
      color === 'secondary'
        ? theme.palette.grey[700]
        : theme.palette.primary.light,
  },
}));

const AppBaseButton = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default AppBaseButton;
