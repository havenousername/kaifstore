import { Box, styled, Typography } from '@mui/material';
import { ReactComponent as FilterSearchIcon } from '../assets/icons/filter-search.svg';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import DropdownPopper from './dropdown-popper';
import { TabItemProp } from '../interfaces/tabs-props';
import AppTabs from './app-tabs';

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

const SearchbarFilter = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState(0);
  const [tabItems] = useState<TabItemProp[]>([
    {
      label: t('Searchbar.FilterUnderPrice'),
      content: 'Under price',
      update: false,
    },
    {
      label: t('Searchbar.FilterUnderDiscount'),
      content: 'Under discount',
      update: false,
    },
    {
      label: t('Searchbar.FilterUnderRating'),
      content: 'Under Rating',
      update: false,
    },
  ]);

  const [popperModifiers] = useState([
    { name: 'offset', options: { offset: [0, 10] } },
  ]);

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
      <Box display={'flex'} paddingLeft={4}>
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
