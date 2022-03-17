import { NextPageWithLayout } from '../../../interfaces/pages-layout';
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import BackButton from '../../../components/common/back-button';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import FileInput from '../../../components/file-input';
import { read, utils } from 'xlsx';
import { SnackbarContext } from '../../../context/snackbar.context';
import { JsonEntity, JsonEntityField } from '../../../interfaces/json-entity';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AppBaseButton from '../../../components/common/app-base-button';
import useCreateImportGroupsProducts from '../../../hooks/use-create-import-groups-products';
import useSWRImmutable from 'swr/immutable';
import { ProductGroup } from '../../../../backend/model/product-groups.model';
import standardFetcher from '../../../api/standard-fetcher';
import { Product } from '../../../../backend/model/products.model';

const ImportExport: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>();
  const snackbar = useContext(SnackbarContext);
  const { initialize, error, data } = useCreateImportGroupsProducts();
  const [rows, setRows] = useState<JsonEntity[]>([]);

  const { data: groups } = useSWRImmutable<ProductGroup[]>(
    '/v1/product-groups?desc=parentGroup&asc=childrenGroups',
    standardFetcher,
  );

  const { data: products } = useSWRImmutable<Product[]>(
    '/v1/products/all',
    standardFetcher,
  );

  const columns: GridColDef[] = [
    {
      field: JsonEntityField.UUID,
      headerName: 'Uuid',
      width: 250,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
    },
    {
      field: JsonEntityField.GROUP,
      headerName: 'Group',
      width: 70,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.group ? 'Yes' : 'No',
    },
    {
      field: JsonEntityField.PARENT_UUID,
      headerName: 'Parent group',
      width: 130,
    },
    {
      field: JsonEntityField.PRICE,
      headerName: 'Product price',
      width: 130,
    },
    {
      field: JsonEntityField.COST_PRICE,
      headerName: 'Cost price',
      width: 130,
    },
    {
      field: JsonEntityField.QUANTITY,
      headerName: 'Amount of items',
      width: 130,
    },
    {
      field: JsonEntityField.CODE,
      headerName: 'Code',
      width: 100,
    },
    {
      field: JsonEntityField.ALLOW_TO_SELL,
      headerName: 'Allow to sell',
      width: 70,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.allowToSell ? 'Yes' : 'No',
    },
    {
      field: JsonEntityField.MEASURE_NAME,
      headerName: 'Measure name',
      width: 100,
    },
    {
      field: JsonEntityField.DESCRIPTION,
      headerName: 'Measure name',
      width: 100,
      valueFormatter: (params) =>
        String(params.value).length > 40
          ? String(params.value).slice(0, 40) + '...'
          : params.value,
    },
    {
      field: JsonEntityField.ARTICLE_NUMBER,
      headerName: 'Article number',
      width: 70,
    },
    {
      field: JsonEntityField.TAX,
      headerName: 'Tax',
      width: 70,
    },
    {
      field: JsonEntityField.TYPE,
      headerName: 'Type',
      width: 140,
    },
    {
      field: JsonEntityField.BAR_CODES,
      headerName: 'Bar codes',
      width: 130,
      valueFormatter: (params) => (params.value as string[]).join(', '),
    },
  ];

  const onClickImport = () => {
    initialize(rows);
  };

  useEffect(() => {
    if (!!error) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (data) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('success');
      snackbar.changeMessage(t('Alert.ItemsAdded'));
      router.push('/admin/products');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onChangeImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files[0]) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(t('Alert.UploadError', { error: '' }));
      return;
    }
    const buffer = await e.target.files[0].arrayBuffer();
    const workbook = read(buffer);

    const transformToNumber = (num: unknown) =>
      num ? +num.toString().replace(',', '.') : undefined;

    try {
      const jsonWorkbook = Object.values(workbook.Sheets)
        .map<JsonEntity[]>(
          (sheet) =>
            utils.sheet_to_json(sheet, {
              rawNumbers: true,
            }) as unknown as JsonEntity[],
        )
        .flat<JsonEntity[][]>(1)
        .map<JsonEntity>((entity: JsonEntity) => ({
          ...entity,
          allowToSell: Boolean(transformToNumber(entity.allowToSell)),
          price: transformToNumber(entity.price),
          costPrice: transformToNumber(entity.costPrice),
          group: Boolean(transformToNumber(entity.group)),
          hasVariants: Boolean(transformToNumber(entity.hasVariants)),
          articleNumber: transformToNumber(entity.articleNumber),
          quantity: transformToNumber(entity.quantity),
          [JsonEntityField.BAR_CODES]: entity.barCodes
            ? entity.barCodes.toString().split(',')
            : [],
        }))
        .sort((a) => (a.group ? (a.parentUuid ? 1 : -1) : 1));

      jsonWorkbook.forEach((entity, index, array) => {
        if (entity.group && entity.parentUuid) {
          const groupIndex = array.findIndex(
            (e) => e.uuid === entity.parentUuid,
          );
          if (groupIndex === -1) {
            console.error(entity.parentUuid, array);
            throw new Error(t('Alert.NoIndexError', { entity: entity.name }));
          }

          if (groupIndex < index) {
            return;
          }

          const group = array[groupIndex];
          array[groupIndex] = array[index];
          array[index] = group;
        }
      });

      let hasDuplicateGroup = false;
      let hasDuplicateProducts = false;
      if (groups) {
        hasDuplicateGroup =
          jsonWorkbook
            .filter((i) => !!i[JsonEntityField.GROUP])
            .filter((i) =>
              groups.find((group) => group.uuid === i[JsonEntityField.UUID]),
            ).length > 0;

        if (hasDuplicateGroup) {
          snackbar.changeIsOpen(true);
          snackbar.changeSeverity('error');
          snackbar.changeMessage(t('Alert.DuplicatedItem'));
          snackbar.changeAutoHide(3000);
        }
      }

      if (products) {
        hasDuplicateProducts =
          jsonWorkbook
            .filter((i) => !i[JsonEntityField.GROUP])
            .filter((i) =>
              products.find(
                (product) => product.uuid === i[JsonEntityField.UUID],
              ),
            ).length > 0;
        if (hasDuplicateProducts) {
          snackbar.changeIsOpen(true);
          snackbar.changeSeverity('error');
          snackbar.changeMessage(t('Alert.DuplicatedItem'));
          snackbar.changeAutoHide(3000);
        }
      }

      if (hasDuplicateGroup || hasDuplicateProducts) {
        return;
      }

      setRows(jsonWorkbook);
    } catch (e) {
      console.error(e);
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(t('Alert.UploadError', { error: e.message }));
      return;
    }
  };

  const importReqRows = [
    { name: 'uuid', rule: t('Products.Required') },
    { name: 'name', rule: t('Products.Required') },
    { name: 'group', rule: t('Products.Required') },
    { name: 'hasVariants', rule: t('Products.NotRequired') },
    { name: 'code', rule: t('Products.NotRequired') },
    { name: 'parentUuid', rule: t('Products.NotRequired') },
    { name: 'measureName', rule: t('Products.NotRequired') },
    { name: 'tax', rule: t('Products.NotRequired') },
    { name: 'allowToSell', rule: t('Products.NotRequired') },
    { name: 'description', rule: t('Products.NotRequired') },
    { name: 'articleNumber', rule: t('Products.NotRequired') },
    { name: 'type', rule: t('Products.NotRequired') },
    { name: 'price', rule: t('Products.NotRequired') },
    { name: 'costPrice', rule: t('Products.NotRequired') },
    { name: 'quantity', rule: t('Products.NotRequired') },
    { name: 'barCodes', rule: t('Products.NotRequired') },
  ];

  return (
    <Box
      sx={{
        padding: '1rem 8rem 4rem',
        marginBottom: '2rem',
      }}
    >
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {t('Products.Import/Export')}
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <BackButton
          goBack={router.back}
          text={t('Utils.GoBack')}
          sx={{ my: '1.5rem' }}
        />
      </Box>
      <Box>
        <Typography variant={'h3'} component={'h5'} fontWeight={600}>
          {t('Products.ImportProducts')}
        </Typography>
        <Typography variant={'subtitle1'} component={'h5'} marginBottom={2}>
          {t('Products.ImportProductsExplanation1')}
        </Typography>
        <Typography variant={'subtitle1'} component={'h5'} marginBottom={2}>
          {t('Products.ImportProductsExplanation2')}
        </Typography>
        <Typography
          variant={'h4'}
          component={'h5'}
          marginBottom={2}
          sx={{
            color: 'error.light',
          }}
        >
          {t('Products.ImportantExplanation')}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  variant={'head'}
                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  align="left"
                >
                  {t('Products.NameOfCell')}
                </TableCell>
                <TableCell
                  variant={'head'}
                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  align="left"
                >
                  {t('Products.ImportRequired')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importReqRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{ borderColor: 'grey.500' }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{ borderColor: 'grey.500' }}
                    component="th"
                    scope="row"
                  >
                    {row.rule}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ marginTop: '2rem' }}>
          <FileInput
            onChangeInput={onChangeImport}
            param={0}
            label={
              <>
                <Box
                  sx={{
                    backgroundColor: 'primary.light',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    maxWidth: '300px',
                  }}
                >
                  <Typography
                    textAlign={'center'}
                    variant={'subtitle2'}
                    component={'h5'}
                  >
                    {t('Products.Import')}
                  </Typography>
                </Box>
              </>
            }
            ref={ref}
            accept={'.xls, .xlsx'}
          />
        </Box>
        {rows.length > 0 && (
          <Box height={'1000px'} marginTop={'3rem'}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={100}
              getRowId={(row) => row.uuid}
            />
            <AppBaseButton
              variant={'contained'}
              color={'primary'}
              type={'button'}
              onClick={onClickImport}
              sx={{
                marginTop: '2rem',
              }}
            >
              {t('Products.ImportToBackend')}
            </AppBaseButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

ImportExport.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default ImportExport;
