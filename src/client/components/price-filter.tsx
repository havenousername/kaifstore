import { Box } from '@mui/material';
import AppRange from './app-range';
import React, { ChangeEvent, useState } from 'react';
import AppInput from './app-input';
import { useTranslation } from 'react-i18next';
import FilterTabFooter from './filter-tab-footer';
import FilterTabHeader from './filter-tab-header';

const PriceFilter = ({
  priceRange,
  minRange,
  maxRange,
  onPriceRangeSelect,
  onCancelSelect,
}: {
  priceRange: [number, number];
  minRange: number;
  maxRange: number;
  onPriceRangeSelect: (pr: [number, number]) => void;
  onCancelSelect: () => void;
}) => {
  const [range, setRange] = useState<[number, number]>(priceRange);
  const [initialRange] = useState<[number, number]>(priceRange);
  const { t } = useTranslation();

  const onChangeRange = (range: [number, number]) => {
    setRange(range);
  };

  const validateRangeChange = (value: number) => {
    return value >= minRange && value <= maxRange;
  };

  const onFirstInRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!validateRangeChange(+e.target.value) || +e.target.value > range[1]) {
      return;
    }
    setRange([+e.target.value, range[1]]);
  };

  const onSecondInRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!validateRangeChange(+e.target.value) || +e.target.value < range[0]) {
      return;
    }
    setRange([range[0], +e.target.value]);
  };

  const sxAppInputFirst = {
    my: 2,
    border: 'none !important',
    backgroundColor: 'background.default',
    borderRadius: '20px !important',
    minHeight: '3.5rem',
    paddingTop: '1.2rem !important',
    paddingLeft: '0.3rem !important',
    fontSize: '18px',
    flexBasis: '48%',
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
    '&:before': {
      content: `'${t('Searchbar.UnderPrice.From')}'`,
      position: 'absolute',
      fontSize: '0.7rem',
      fontWeight: 800,
      color: 'grey.200',
      top: 0,
      left: '20px',
    },
  };

  const sxAppInputSecond = {
    ...sxAppInputFirst,
    '&:before': {
      ...sxAppInputFirst['&:before'],
      content: `'${t('Searchbar.UnderPrice.Until')}'`,
    },
  };

  return (
    <Box>
      <FilterTabHeader
        onRestore={() => setRange(initialRange)}
        restoreText={t('Searchbar.Restore')}
      />
      <Box pt={2}>
        <AppRange
          range={range}
          max={maxRange}
          min={minRange}
          minDistance={10}
          changeRange={onChangeRange}
        />
        <Box display={'flex'} justifyContent={'space-between'}>
          <AppInput
            sx={sxAppInputFirst}
            inputProps={{
              value: range[0],
              onChange: onFirstInRangeChange,
            }}
            type={'number'}
          />
          <AppInput
            sx={sxAppInputSecond}
            inputProps={{
              value: range[1],
              onChange: onSecondInRangeChange,
            }}
            type={'number'}
          />
        </Box>
      </Box>
      <FilterTabFooter
        onSelect={() => onPriceRangeSelect(range)}
        onCancel={onCancelSelect}
        selectText={t('Utils.Select')}
        cancelText={t('Utils.Cancel')}
      />
    </Box>
  );
};

export default PriceFilter;
