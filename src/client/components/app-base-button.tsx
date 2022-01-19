import { styled } from '@material-ui/styles';
import { Button, ButtonProps } from '@mui/material';

const StyledButton = styled(Button)<ButtonProps>(({}) => ({
  maxWidth: '14.375rem',
  fontWeight: 'bold',
  width: '100%',
  borderRadius: '0.3rem',
}));

const AppBaseButton = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default AppBaseButton;
