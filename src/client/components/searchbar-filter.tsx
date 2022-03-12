import { Box, styled, Typography } from '@mui/material';
import { ReactComponent as FilterSearchIcon } from '../assets/icons/filter-search.svg';
import { useTranslation } from 'react-i18next';
import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import DropdownPopper from './common/dropdown-popper';
import { TabItemProp } from '../interfaces/tabs-props';
import AppTabs from './common/app-tabs';
import PriceFilter from './filter/price-filter';
import { SearchFiltersState } from '../interfaces/searchbar';
import OptionSelectFilter from './option-select-filter';
import { ItemProp } from '../interfaces/labeled-prop';
import useSWRImmutable from 'swr/immutable';
import fetcher from '../api/root-fetcher';

const CustomFilterButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& path': {
    transition: theme.transitions.create(['color', 'fill']),
    fill: theme.palette.grey['500'],
  },
  '& .search-bar__filter-text': {
    transition: theme.transitions.create(['color', 'fill']),
    color: theme.palette.grey['500'],
  },
  '&:hover': {
    '& path': {
      fill: theme.palette.common.white,
    },
    '& .search-bar__filter-text': {
      color: theme.palette.common.white,
    },
  },
  '&[aria-selected="true"]': {
    '& path': {
      fill: theme.palette.common.white,
    },
    '& .search-bar__filter-text': {
      color: theme.palette.common.white,
    },
  },
}));

const SearchbarFilter = ({
  setCurrentQuery,
  queryDiscount,
  queryPriceRange,
}: {
  setCurrentQuery: (s: Record<string, string>) => void;
  queryPriceRange: [number, number] | undefined;
  queryDiscount: number | undefined;
}) => {
  const initialFilters: MutableRefObject<
    Omit<SearchFiltersState, 'priceRange'>
  > = useRef({
    rating: null,
    discountAmount: null,
  });
  const { t } = useTranslation();
  const { data: maxRangeData } = useSWRImmutable<number>(
    `v1/products/max-price`,
    fetcher,
  );

  const { data: minRangeData } = useSWRImmutable<number>(
    `v1/products/min-price`,
    fetcher,
  );

  const discountOptions: (ItemProp<number> & { disabled: boolean })[] = [
    { content: 10, label: t('Searchbar.UnderDiscount.10%'), disabled: false },
    { content: 20, label: t('Searchbar.UnderDiscount.20%'), disabled: false },
    { content: 60, label: t('Searchbar.UnderDiscount.60%'), disabled: false },
  ];

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [discountAmount, setDiscountAmount] = useState<number | null>(
    initialFilters.current.discountAmount,
  );

  const handlePriceRange = (pr: [number, number]) => {
    setPriceRange(pr);
    setCurrentQuery({ priceRange: pr.join('-') });
    setOpen(false);
  };

  const handleDiscount = (discount: number) => {
    setDiscountAmount(discount);
    setCurrentQuery({ discount: String(discount) });
    setOpen(false);
  };

  const [tabItems, setTabItems] = useState<TabItemProp[]>([
    {
      label: t('Searchbar.FilterUnderPrice'),
      content: (
        <PriceFilter
          priceRange={priceRange}
          maxRange={maxRangeData}
          minRange={minRangeData}
          onPriceRangeSelect={handlePriceRange}
          onCancelSelect={() => handleOpenPopper(false)}
        />
      ),
      update: false,
    },
    {
      label: t('Searchbar.FilterUnderDiscount'),
      content: (
        <OptionSelectFilter
          options={discountOptions}
          value={discountAmount}
          onSelect={(v) => handleDiscount(v)}
          onCancelSelect={() => handleOpenPopper(false)}
        />
      ),
      update: false,
    },
  ]);

  useEffect(() => {
    setPriceRange((prevState) => [prevState[0], maxRangeData]);
    setTabItems((prevState) => [
      {
        ...prevState[0],
        content: React.cloneElement(prevState[0].content as ReactElement, {
          maxRange: maxRangeData,
        }),
      },
      ...prevState.slice(1),
    ]);
  }, [maxRangeData]);

  const [queryPassed, setQueryPassed] = useState({
    discount: false,
    priceRange: false,
    rating: false,
  });

  useEffect(() => {
    if (queryPriceRange) {
      setQueryPassed((prevState) => ({ ...prevState, priceRange: true }));
    }
    const current = !queryPassed.priceRange
      ? queryPriceRange ?? priceRange
      : priceRange;
    setTabItems((prevState) => [
      {
        ...prevState[0],
        content: React.cloneElement(prevState[0].content as ReactElement, {
          priceRange: current,
        }),
        update: !!current,
      },
      ...prevState.slice(1),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, queryPriceRange]);

  useEffect(() => {
    if (queryDiscount) {
      setQueryPassed((prevState) => ({ ...prevState, discount: true }));
    }

    const current = !queryPassed.discount
      ? queryDiscount ?? discountAmount
      : discountAmount;

    setTabItems((prevState) => [
      prevState[0],
      {
        ...prevState[1],
        content: React.cloneElement(prevState[1].content as ReactElement, {
          value: current,
        }),
        update: !!current,
      },
      ...prevState.slice(2),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountAmount, queryDiscount]);

  useEffect(() => {
    setPriceRange((prevState) => [minRangeData, prevState[1]]);
    setTabItems((prevState) => [
      {
        ...prevState[0],
        content: React.cloneElement(prevState[0].content as ReactElement, {
          minRange: minRangeData,
        }),
      },
      ...prevState.slice(1),
    ]);
  }, [minRangeData]);

  const [popperModifiers] = useState([
    { name: 'offset', options: { offset: [0, 10] } },
  ]);
  const filterRef = useRef<HTMLDivElement>();

  const handleOpenPopper = (b: boolean) => {
    setOpen(b);
  };

  const handleCurrentTab = (index: number) => {
    setCurrentTab(index);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  return (
    <>
      <Box display={'flex'} paddingLeft={4} ref={filterRef}>
        <CustomFilterButton
          aria-describedby={id}
          onClick={handleClick}
          aria-selected={open}
        >
          <FilterSearchIcon />
          <Typography
            className={'search-bar__filter-text'}
            marginLeft={1}
            variant={'h5'}
          >
            {t('Searchbar.Filter')}
          </Typography>
        </CustomFilterButton>
      </Box>
      <DropdownPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        modifiers={popperModifiers}
        handleOpen={handleOpenPopper}
        ignoreClickElements={[filterRef]}
        sxRoot={{
          width: '28rem',
        }}
      >
        <AppTabs
          currentTab={currentTab}
          onChange={handleCurrentTab}
          items={tabItems}
        />
      </DropdownPopper>
    </>
  );
};

export default SearchbarFilter;
