import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { ReactComponent as MainPage } from '../assets/icons/main.svg';
import { ReactComponent as CatalogPage } from '../assets/icons/catalog.svg';

const Navbar = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [navBars] = useState<
    Array<{ name: string; path: string; current: boolean; icon: ReactNode }>
  >([
    {
      name: t('Pages.Index'),
      path: '/',
      current: router.route === '/',
      icon: <MainPage />,
    },
    {
      name: t('Pages.Catalog'),
      path: '/catalog',
      current: router.route === '/catalog',
      icon: <CatalogPage />,
    },
  ]);
  return (
    <>
      <Paper
        sx={{
          width: '50%',
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
        <Divider sx={{ margin: '2rem 0 3rem' }} />
        <Typography
          variant={'caption'}
          component={'span'}
          gutterBottom
          style={{ paddingLeft: '1rem' }}
        >
          {t('Navbar.Pages')}
        </Typography>
        <MenuList>
          {navBars.map((navbar, key) => {
            return (
              <Link href={navbar.path} key={key}>
                <MenuItem
                  aria-selected={navbar.current}
                  sx={{ margin: '1rem 0' }}
                >
                  <ListItemIcon>{navbar.icon}</ListItemIcon>
                  <ListItemText>{navbar.name}</ListItemText>
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Paper>
    </>
  );
};

export default Navbar;
