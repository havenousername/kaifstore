import { ItemProp } from '../interfaces/labeled-prop';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Box } from '@mui/material';
import FilterTabHeader from './filter-tab-header';
import { useTranslation } from 'react-i18next';
import AppRadioNoIconGroup from './app-radio-no-icon-group';
import FilterTabFooter from './filter-tab-footer';

const OptionSelectFilter: FunctionComponent<{
  value: number;
  options: (ItemProp<number> & { disabled: boolean })[];
  onSelect: (v: number) => void;
  onCancelSelect: () => void;
}> = ({ options, value, onSelect, onCancelSelect }) => {
  const [initialValue] = useState<number>(value);
  const [changeableValue, setChangeableValue] = useState<number>(value);
  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, v: string) => {
    setChangeableValue(+v);
  };

  return (
    <Box>
      <FilterTabHeader
        onRestore={() => setChangeableValue(initialValue)}
        restoreText={t('Searchbar.Restore')}
      />
      <AppRadioNoIconGroup<number>
        sx={{ py: '1rem' }}
        defaultValue={initialValue}
        items={options}
        value={changeableValue}
        handleChange={handleChange}
      />
      <FilterTabFooter
        onSelect={() => onSelect(changeableValue)}
        onCancel={onCancelSelect}
        selectText={t('Utils.Select')}
        cancelText={t('Utils.Cancel')}
      />
    </Box>
  );
};

export default OptionSelectFilter;
