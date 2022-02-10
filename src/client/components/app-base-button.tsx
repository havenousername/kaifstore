import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  maxWidth: '14.375rem',
  fontWeight: 'bold',
  width: '100%',
  borderRadius: '0.3rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const AppBaseButton = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default AppBaseButton;
