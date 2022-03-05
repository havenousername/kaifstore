import { StandardInput } from './app-input';
import { AppSelectProps } from '../../interfaces/input-props';
import { MenuItem, Select, styled } from '@mui/material';
import { ReactElement } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down.svg';

const StandardSelect = styled(Select)(() => ({
  '& svg': {
    position: 'absolute',
    right: '1rem',
    top: '50%',
  },
}));

const AppSelect: (props: AppSelectProps) => ReactElement = ({
  value,
  onChange,
  values,
  error,
}) => {
  return (
    <StandardSelect
      labelId="demo-customized-select-label"
      id={`app-select-${value}`}
      value={value}
      onChange={onChange}
      input={<StandardInput />}
      IconComponent={() => <ArrowDownIcon />}
      error={error}
    >
      {values.map((item, key) => (
        <MenuItem
          key={key}
          value={item.value}
          sx={{
            '&:not(:last-child)': {
              marginBottom: '10px',
            },
          }}
        >
          {item.content}
        </MenuItem>
      ))}
    </StandardSelect>
  );
};

export default AppSelect;
