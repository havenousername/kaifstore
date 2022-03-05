import Paper from '@mui/material/Paper';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavbarSection from './navbar-section';
import useSWR from 'swr';
import useNavbarLinks from '../../hooks/use-navbar-links';
import { Box, Divider, Typography } from '@mui/material';
import AppAccordion from '../common/app-accordion';
import { AccordionPropData } from '../../interfaces/accordions';
import { ProductGroupLimited } from '../../../backend/interfaces/product-groups';
import { ProductGroup } from '../../../backend/model/product-groups.model';
import standardFetcher from '../../api/standard-fetcher';
import {
  AuthenticationContext,
  UserAuthenticated,
} from '../../context/authenticated.context';
import NavbarHeaderAuthenticated from './navbar-header-authenticated';
import NavbarHeaderUnauthenticated from './navbar-header-unauthenticated';
import { useRouter } from 'next/router';
import { SUPER_USER_ROLE } from '../../../backend/app/contstants';

const Navbar = () => {
  const { t } = useTranslation();
  const { data } = useSWR<ProductGroupLimited[]>(
    '/v1/product-groups/root?onlyImportant=true',
    standardFetcher,
  );
  const [groupAccordion, setGroupsAccordion] = useState<AccordionPropData[]>(
    [],
  );
  const router = useRouter();
  const { user, authenticated, checkAuthentication } =
    useContext<UserAuthenticated>(AuthenticationContext);

  const mapGroupAccordion = useCallback(
    (
      data: AccordionPropData[],
      func: (data: AccordionPropData) => AccordionPropData,
    ) => {
      if (data.length === 0 || !data) {
        return [];
      }

      return data.map((d) => {
        if (typeof d.details === 'string' || !Array.isArray(d.details)) {
          return func(d);
        }

        return { ...func(d), details: mapGroupAccordion(d.details, func) };
      });
    },
    [],
  );

  const onGroupRoute = useCallback(
    (data: AccordionPropData | ProductGroup) => {
      setGroupsAccordion((prevState) =>
        mapGroupAccordion(prevState, (group) => {
          group.selected = (data as ProductGroup).uuid
            ? group.id === (data as ProductGroup).uuid
            : group.id === data.id;
          return group;
        }),
      );
      router.push(`/catalog?groupId=${(data as ProductGroup).uuid ?? data.id}`);
    },
    [mapGroupAccordion, router],
  );

  const createGroupData = (groups: ProductGroup[]): AccordionPropData[] => {
    if (!groups || groups.length === 0) {
      return [];
    }
    return groups.map<AccordionPropData>((group) => ({
      name: String(group.name),
      id: String(group.uuid),
      selected:
        String(group.uuid) ===
        decodeURI((router.query.groupId as string) ?? ''),
      summary: (
        <Typography
          onClick={() => {
            onGroupRoute(group);
          }}
          sx={{
            cursor: 'pointer',
          }}
          variant={'h6'}
          id={group.uuid}
        >
          {group.name}
        </Typography>
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
  }, [data, router]);

  const [pages, adminPages] = useNavbarLinks();

  return (
    <>
      <Paper
        sx={{
          width: '100%',
          maxWidth: '20.75rem',
          position: 'sticky',
          top: '0',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderRight: (theme) => `1px solid ${theme.palette.grey[500]}`,
          padding: '0 1rem',
        }}
      >
        <Box sx={{ overflowY: 'scroll' }}>
          <Typography variant={'h4'} component={'h3'} padding={'2rem 1rem'}>
            {t('Kaifstore')}
          </Typography>
          <Typography
            variant={'caption'}
            component={'span'}
            gutterBottom
            paddingLeft={'1rem'}
          >
            {t('Navbar.User')}
          </Typography>
          {authenticated && user && Object.keys(user).length > 0 ? (
            <NavbarHeaderAuthenticated
              user={user}
              checkAuthentication={() => checkAuthentication()}
            />
          ) : (
            <NavbarHeaderUnauthenticated />
          )}
          {authenticated &&
            user &&
            Object.keys(user).length > 0 &&
            user.role.name === SUPER_USER_ROLE.name && (
              <NavbarSection linkItems={adminPages} showDivider={false} />
            )}
          <NavbarSection title={t('Navbar.Pages')} linkItems={pages} />
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
            <AppAccordion
              data={groupAccordion}
              onChange={(data) => onGroupRoute(data)}
            />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Navbar;
