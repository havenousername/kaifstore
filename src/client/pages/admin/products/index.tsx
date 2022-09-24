import standardFetcher from '../../../api/standard-fetcher';
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AdminTheme from '../../../components/functional/admin-theme';
import AppLayout from '../../../components/functional/app-layout';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import { ProductGroup } from '../../../../backend/model/product-groups.model';
import AppBaseButton from '../../../components/common/app-base-button';
import { useTranslation } from 'react-i18next';
import { lighten } from '@mui/system/colorManipulator';
import { ReactComponent as ParentGroupIcon } from '../../../assets/icons/parent-group.svg';
import { ReactComponent as ChildGroupIcon } from '../../../assets/icons/child-group.svg';
import { ReactComponent as ProductIcon } from '../../../assets/icons/products.svg';
import { ReactComponent as ImportIcon } from '../../../assets/icons/import-icon.svg';
import { TypographyLineEllipsis } from 'src/client/components/product-card-skeleton';
import GroupInitialButton from '../../../components/group-initial-button';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useGroupFetchRemove from '../../../hooks/use-group-fetch-remove';
import { SnackbarContext } from '../../../context/snackbar.context';
import useDetectBottomScroll from '../../../hooks/use-detect-bottom-scroll';

const GroupCard = ({
  group,
  onRemove,
}: {
  group: ProductGroup;
  onRemove: (group: ProductGroup) => void;
}) => {
  const theme = useTheme();
  const getProductsCount = (g: ProductGroup): number => {
    if (!g.childrenGroups || g.childrenGroups.length === 0) {
      return g.products ? g.products.length : 0;
    }

    return (
      g.products.length +
      g.childrenGroups
        .map((child) => getProductsCount(child))
        .reduce((a, b) => a + b, 0)
    );
  };

  const { t } = useTranslation();
  return (
    <Card
      sx={{
        maxWidth: 432,
        marginBottom: '30px',
        height: 340,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in',
        padding: '1rem 1rem 0',
        backgroundColor: 'grey.600',
        border: `2px solid ${theme.palette.grey[500]}`,
        '&:hover': {
          backgroundColor: lighten(theme.palette.grey[700], 0.05),
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant={'subtitle2'}>
              {!group.parentGroup
                ? t('Products.ParentGroup')
                : t('Products.ChildGroup')}
            </Typography>
            {!group.parentGroup ? <ParentGroupIcon /> : <ChildGroupIcon />}
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <TypographyLineEllipsis gutterBottom variant={'h5'}>
              {group.name}
            </TypographyLineEllipsis>
            <Typography
              variant={'subtitle1'}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {group.description && group.description.length === 0
                ? t('Products.NoDescription')
                : group.description}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box display={'flex'}>
            <Box display={'flex'} alignItems={'center'}>
              <ProductIcon />
              <Typography marginLeft={1} variant={'h6'}>
                {getProductsCount(group)}
              </Typography>
            </Box>
            {!group.parentGroup && group.childrenGroups && (
              <Box marginLeft={4} display={'flex'} alignItems={'center'}>
                <ChildGroupIcon />
                <Typography marginLeft={1} variant={'h6'}>
                  {group.childrenGroups.length}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            display={'flex'}
            minHeight={'3.5rem'}
            alignItems={'center'}
            height={'100%'}
          >
            <Link
              href={`/admin/products/${group.uuid}`}
              sx={{
                flexBasis: '40%',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <AppBaseButton
                variant={'contained'}
                color={'primary'}
                sx={{
                  fontWeight: 700,
                  maxHeight: '2.75rem',
                }}
              >
                {t('Utils.Browse')}
              </AppBaseButton>
            </Link>
            <AppBaseButton
              variant={'outlined'}
              color={'error'}
              onClick={() => onRemove(group)}
              sx={{
                fontWeight: 700,
                maxHeight: '2.75rem',
                flexBasis: '40%',
                marginLeft: '1rem',
                borderWidth: '2px',
                '&:hover': {
                  backgroundColor: 'error.light',
                },
              }}
            >
              {t('Utils.Delete')}
            </AppBaseButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    error: groupError,
    mutate,
  } = useSWR<{
    items: ProductGroup[];
    meta: any;
  }>(
    `/v1/product-groups?desc=parentGroup&asc=childrenGroups&page=${currentPage}`,
    standardFetcher,
  );
  const [groups, setGroups] = useState<ProductGroup[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const snackbar = useContext(SnackbarContext);

  const { initialize, data: removeSuccess, error } = useGroupFetchRemove();
  const groupsCollectionRef = useRef<HTMLDivElement>();
  const [isBottom] = useDetectBottomScroll(groupsCollectionRef);

  const onRemoveGroup = (group: ProductGroup) => {
    initialize({ id: group.id });
  };

  useEffect(() => {
    if (data && !groupError) {
      setGroups((groups) => [...groups, ...data.items]);
    }
  }, [data, groupError]);

  useEffect(() => {
    if (isBottom) {
      getMoreGroups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);

  function getMoreGroups() {
    setCurrentPage((page) => page + 1);
    mutate();
  }

  useEffect(() => {
    if (!!removeSuccess) {
      mutate();
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('success');
      snackbar.changeMessage(t('Alert.GroupDeleted'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeSuccess]);

  useEffect(() => {
    if (error) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(t('Alert.BackendError', { error: error }));
      console.error('An error occured', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (!groups) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: '2rem 8rem 4rem',
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={'1rem'}
      >
        <Typography
          variant={'h4'}
          component={'h4'}
          padding={(theme) => theme.spacing(2, 3)}
          fontWeight={600}
        >
          {t('Products.Products')} / {t('Products.Group')}
        </Typography>
        {groups && groups.length > 0 && (
          <Box
            display={'flex'}
            maxWidth={'400px'}
            width={'100%'}
            justifyContent={'space-between'}
          >
            <Link
              href={'/admin/products/import-export'}
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <AppBaseButton
                variant={'outlined'}
                color={'secondary'}
                sx={{
                  fontWeight: 700,
                  maxHeight: '2.75rem',
                }}
              >
                {t('Products.Import/Export')}
              </AppBaseButton>
            </Link>
            <Link
              href={'/admin/products/create'}
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <AppBaseButton
                variant={'contained'}
                color={'primary'}
                sx={{
                  fontWeight: 700,
                  maxHeight: '2.75rem',
                }}
              >
                {t('Products.CreateNewProduct')}
              </AppBaseButton>
            </Link>
          </Box>
        )}
      </Box>
      {groups && groups.length > 0 ? (
        <Grid ref={groupsCollectionRef} container spacing={2}>
          {groups.map((group, key) => (
            <Grid item xs={10} lg={6} key={key}>
              <GroupCard group={group} onRemove={onRemoveGroup} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display={'flex'} flexDirection={'column'}>
          <GroupInitialButton
            text={t('Products.ImportGroupsProducts')}
            onClick={() => router.push('/admin/products/import-export')}
            icon={<ImportIcon viewBox={'0,0,125px,115px'} />}
            disabled={false}
            sx={{
              marginBottom: '3rem',
            }}
          />
          <GroupInitialButton
            text={t('Products.CreateNewProduct')}
            onClick={() => router.push('/admin/products/create')}
            icon={<ProductIcon transform={'scale(2.5)'} />}
            disabled={groups.length === 0}
          />
        </Box>
      )}
    </Box>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default Index;
