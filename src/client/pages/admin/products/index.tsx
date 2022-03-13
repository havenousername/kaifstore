import standardFetcher from '../../../api/standard-fetcher';
import useSWRImmutable from 'swr/immutable';
import React, { ReactElement } from 'react';
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
import { TypographyLineEllipsis } from 'src/client/components/product-card-skeleton';

const GroupCard = ({ group }: { group: ProductGroup }) => {
  const theme = useTheme();
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
              {!group.parentGroup ? 'Parent Group' : 'Child Group'}
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
              {group.description.length === 0
                ? 'No description provided'
                : group.description}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box display={'flex'}>
            <Box display={'flex'} alignItems={'center'}>
              <ProductIcon />
              <Typography marginLeft={1} variant={'h6'}>
                {group.products.length}
              </Typography>
            </Box>
            {!group.parentGroup && (
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
                {'Browse'}
              </AppBaseButton>
            </Link>
            <AppBaseButton
              variant={'outlined'}
              color={'error'}
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
              {'Delete'}
            </AppBaseButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const { data } = useSWRImmutable<ProductGroup[]>(
    '/v1/product-groups?desc=parentGroup&asc=childrenGroups',
    standardFetcher,
  );
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: '1rem 8rem 4rem',
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography
          variant={'h4'}
          component={'h4'}
          padding={(theme) => theme.spacing(2, 3)}
          fontWeight={600}
        >
          {t('Products.Products')}
        </Typography>
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
      <Grid container spacing={2}>
        {data.map((group, key) => (
          <Grid item xs={10} lg={6} key={key}>
            <GroupCard group={group} />
          </Grid>
        ))}
      </Grid>
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
