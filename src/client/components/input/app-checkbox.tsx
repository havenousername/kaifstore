import { FormControlLabel, FormControlLabelProps, styled } from '@mui/material';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import React from 'react';
import checkBox from '../../assets/icons/check-mark.svg';

const StandardIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  backgroundColor: 'transparent',
  border: `2px solid ${theme.palette.primary.main}`,
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.grey['50'],
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    border: `2px solid ${theme.palette.grey['500']}`,
  },
}));

const StandardCheckedIcon = styled(StandardIcon)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    content: '""',
    backgroundImage: `url(${checkBox})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StandardLabel = styled(FormControlLabel)(({}) => ({
  '& .MuiFormControlLabel-label': {
    fontWeight: 'bold',
  },
}));

function StandardCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<StandardCheckedIcon />}
      icon={<StandardIcon />}
      inputProps={{ 'aria-label': 'checkbox' }}
      {...props}
    />
  );
}

type AppCheckBoxProps = {
  checkboxProps?: CheckboxProps;
  labelProps?: Omit<FormControlLabelProps, 'control'>;
};

const AppCheckbox = (props: AppCheckBoxProps) => {
  if (props.labelProps) {
    return (
      <StandardLabel
        control={<StandardCheckbox {...props.checkboxProps} />}
        {...props.labelProps}
      />
    );
  }
  return <StandardCheckbox {...props.checkboxProps} />;
};

export default AppCheckbox;
