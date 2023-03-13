import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import DatePicker from '@mui/lab/DatePicker';
import { StandardTextField } from './app-input';
import { AppDatePickerProps } from '../../interfaces/input-props';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar.svg';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
  de: deLocale,
};

export const maskMap = {
  fr: '__/__/____',
  en: '__/__/____',
  ru: '__.__.____',
  de: '__.__.____',
};
const LocalizedDatePicker = ({
  locale,
  value,
  onChange,
}: AppDatePickerProps) => {
  const theme = useTheme();
  const innerTheme = createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 0, 0, 0) !important',
            '& svg': {
              fill: 'rgba(255, 255, 255, 1)',
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={innerTheme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={localeMap[locale]}
      >
        <DatePicker<Date>
          mask={maskMap[locale]}
          value={value}
          onChange={(newValue: Date | null, keyboardInputValue) =>
            onChange(newValue ?? new Date(), keyboardInputValue)
          }
          components={{
            OpenPickerIcon: CalendarIcon,
          }}
          renderInput={(params) => <StandardTextField {...params} />}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default LocalizedDatePicker;
