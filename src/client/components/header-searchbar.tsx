import { Box, Typography } from '@mui/material';
import AppSearchbar from './app-searchbar';
import { SearchbarProps } from '../interfaces/searchbar';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import useEffectDebounce from '../hooks/use-effect-debounce';
import SearchbarFilter from './searchbar-filter';
import { useEffect, useRef, useState } from 'react';

const HeaderSearchbar = ({ searchBar }: { searchBar: SearchbarProps }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const querySearch = useRef<string>();

  useEffectDebounce(() => {
    if (!router.isReady) return;
    router.push({
      pathname: '/catalog',
      query: { ...router.query, q: encodeURI(searchBar.value) },
    });
    querySearch.current = searchBar.value;
  }, [searchBar.value]);

  const [queryRating, setQueryRating] = useState<number | undefined>();
  const [queryDiscount, setQueryDiscount] = useState<number | undefined>();
  const [queryPriceRange, setQueryPriceRange] = useState<
    [number, number] | undefined
  >();

  const setCurrentQuery = (q: Record<string, string>) => {
    const currentQuery = {};
    const query = router.asPath
      .split('?')[1]
      .split('&')
      .map((p) => p.split('='))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    for (const qPart of Object.entries(query)) {
      currentQuery[qPart[0]] = qPart[1];
    }
    for (const part of Object.entries(q)) {
      currentQuery[part[0]] = encodeURI(part[1]);
    }

    if (currentQuery['q']) {
      currentQuery['q'] = querySearch.current;
    }

    router.push({
      pathname: '/catalog',
      query: currentQuery,
    });
  };

  const [queryParsed, setQueryParsed] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady && !queryParsed) {
      if (!isNaN(+router.query['rating'])) {
        setQueryRating(+router.query['rating']);
      }

      if (!isNaN(+router.query['discount'])) {
        setQueryDiscount(+router.query['discount']);
      }

      if (
        router.query['priceRange'] &&
        typeof router.query['priceRange'] === 'string'
      ) {
        const parsedRange = router.query['priceRange'].split('-');
        if (!isNaN(+parsedRange[0]) && !isNaN(+parsedRange[1])) {
          setQueryPriceRange(
            parsedRange.slice(0, 2).map((i) => +i) as [number, number],
          );
        }
      }

      if (router.query['q']) {
        searchBar.onChange(String(router.query['q']));
      }
      setQueryParsed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <Box
      component={'header'}
      sx={{
        padding: '2rem 8rem',
      }}
    >
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {t('Searchbar.Search')}
      </Typography>
      <AppSearchbar
        sx={{ marginBottom: 1.5 }}
        {...searchBar}
        value={searchBar.value ?? ''}
      />
      <SearchbarFilter
        setCurrentQuery={setCurrentQuery}
        queryRating={queryRating}
        queryDiscount={queryDiscount}
        queryPriceRange={queryPriceRange}
      />
    </Box>
  );
};

export default HeaderSearchbar;
