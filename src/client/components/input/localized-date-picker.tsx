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
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[locale]}
    >
      <DatePicker<Date>
        mask={maskMap[locale]}
        value={value}
        onChange={(newValue, keyboardInputValue) =>
          onChange(newValue, keyboardInputValue)
        }
        components={{
          OpenPickerIcon: CalendarIcon,
        }}
        renderInput={(params) => <StandardTextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default LocalizedDatePicker;
