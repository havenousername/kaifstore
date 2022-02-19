import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarSection from './navbar-section';
import useSWR from 'swr';
import useNavbarLinks from '../hooks/use-navbar-links';
import { Box, Divider, Typography } from '@mui/material';
import AppAccordion from './app-accordion';
import { AccordionPropData } from '../interfaces/accordions';
import { ProductGroupLimited } from '../../backend/interfaces/product-groups';
import { ProductGroup } from '../../backend/model/product-groups.model';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Navbar = () => {
  const { t } = useTranslation();
  const { data } = useSWR<ProductGroupLimited[]>(
    '/v1/product-groups/root?onlyImportant=true',
    fetcher,
  );
  const [groupAccordion, setGroupsAccordion] = useState<AccordionPropData[]>(
    [],
  );

  const createGroupData = (groups: ProductGroup[]): AccordionPropData[] => {
    if (!groups || groups.length === 0) {
      return [];
    }
    return groups.map<AccordionPropData>((group) => ({
      name: String(group.id),
      id: String(group.id),
      summary: (
        <Link href={`/catalog?groupId=${group.id}`}>
          <Typography variant={'h6'}>{group.name}</Typography>
        </Link>
      ),
      details: createGroupData(group.childrenGroups),
    }));
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const groupData = createGroupData(data as ProductGroup[]);
      setGroupsAccordion(groupData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const [navBars] = useNavbarLinks();
  return (
    <>
      <Paper
        sx={{
          width: '30%',
          minWidth: '300px',
          position: 'sticky',
          top: '0',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderRight: (theme) => `1px solid ${theme.palette.grey[500]}`,
          padding: '0 1rem',
        }}
      >
        <NavbarSection title={t('Navbar.Pages')} linkItems={navBars} />
        <Divider sx={{ margin: '2rem 0 3rem' }} />
        <Typography
          variant={'caption'}
          component={'span'}
          gutterBottom
          paddingLeft={'1rem'}
        >
          {t('Navbar.Categories')}
        </Typography>
        <Box sx={{ overflowY: 'scroll' }}>
          <AppAccordion data={groupAccordion} />
        </Box>
      </Paper>
    </>
  );
};

export default Navbar;
