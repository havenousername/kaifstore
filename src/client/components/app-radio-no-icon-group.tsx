import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioProps,
} from '@mui/material';
import { RadioInputProps } from '../interfaces/radio-input-props';
import { SxProps } from '@mui/system';

function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="secondary"
      {...props}
    />
  );
}
const AppRadioNoIconGroup: <T>(
  props: RadioInputProps<T> & { sx?: SxProps },
) => JSX.Element = ({
  label,
  items,
  defaultValue,
  value,
  handleChange,
  sx,
}) => {
  return (
    <FormControl sx={sx}>
      {label && <FormLabel id="">{label}</FormLabel>}
      <RadioGroup
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        name={label ?? String(value)}
      >
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.content}
            disabled={item.disabled}
            control={<BpRadio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default AppRadioNoIconGroup;
