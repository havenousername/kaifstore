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
import {
  ImportFields,
  JsonEntity,
  JsonEntityField,
} from '../../../interfaces/json-entity';
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import AppBaseButton from '../../../components/common/app-base-button';
import useCreateImportGroupsProducts from '../../../hooks/use-create-import-groups-products';
import useSWRImmutable from 'swr/immutable';
import standardFetcher from '../../../api/standard-fetcher';
import { Product } from '../../../../backend/model/products.model';
import AppInput from 'src/client/components/input/app-input';
import { hasTypeProperty } from 'src/client/utils/hasTypeProperty';

const ImportExport: NextPageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);
  const snackbar = useContext(SnackbarContext);
  const { initialize, error, data } = useCreateImportGroupsProducts();
  const [rows, setRows] = useState<JsonEntity[]>([]);
  const [groupRows, setGroupRows] = useState<string[]>([]);

  const { data: savedProducts } = useSWRImmutable<Product[]>(
    '/v1/products/all',
    standardFetcher,
  );

  const onClickImport = () => {
    initialize(groupRows, rows);
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

  const [importReqRows, setImportReqRows] = useState<ImportFields[]>([
    {
      name: JsonEntityField.UUID,
      rule: t('Products.Required'),
      field: t(`ImportFromMoysklad.${JsonEntityField.UUID}`),
      headerName: 'Uuid',
      width: 250,
    },
    {
      rule: t('Products.Required'),
      name: JsonEntityField.NAME,
      field: t(`ImportFromMoysklad.${JsonEntityField.NAME}`),
      headerName: 'Name',
      width: 250,
    },
    {
      name: JsonEntityField.GROUP,
      rule: t('Products.Required'),
      field: t(`ImportFromMoysklad.${JsonEntityField.GROUP}`),
      headerName: 'Group',
      width: 70,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.group ? 'Yes' : 'No',
    },
    {
      name: JsonEntityField.PRICE,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.PRICE}`),
      headerName: 'Product price',
      width: 130,
    },
    {
      name: JsonEntityField.COST_PRICE,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.COST_PRICE}`),
      headerName: 'Cost price',
      width: 130,
    },
    {
      name: JsonEntityField.CURRENCY,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.CURRENCY}`),
      headerName: 'Currency',
      width: 130,
    },
    {
      name: JsonEntityField.COUNTRY,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.COUNTRY}`),
      headerName: 'Country',
      width: 130,
    },
    {
      name: JsonEntityField.QUANTITY,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.QUANTITY}`),
      headerName: 'Amount of items',
      width: 130,
    },
    {
      name: JsonEntityField.CODE,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.CODE}`),
      headerName: 'Code',
      width: 100,
    },
    {
      name: JsonEntityField.ALLOW_TO_SELL,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.ALLOW_TO_SELL}`),
      headerName: 'Allow to sell',
      width: 70,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.allowToSell ? 'Yes' : 'No',
    },
    {
      name: JsonEntityField.MEASURE_NAME,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.MEASURE_NAME}`),
      headerName: 'Measure name',
      width: 100,
    },
    {
      name: JsonEntityField.DESCRIPTION,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.DESCRIPTION}`),
      headerName: 'Measure name',
      width: 100,
      valueFormatter: (params) =>
        String(params.value).length > 40
          ? String(params.value).slice(0, 40) + '...'
          : params.value,
    },
    {
      name: JsonEntityField.DISCOUNT_PROHIBITED,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.DISCOUNT_PROHIBITED}`),
      headerName: 'Discount prohibited',
      width: 130,
    },
    {
      name: JsonEntityField.ARTICLE_NUMBER,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.ARTICLE_NUMBER}`),
      headerName: 'Article number',
      width: 70,
    },
    {
      name: JsonEntityField.TAX,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.TAX}`),
      headerName: 'Tax',
      width: 70,
    },
    {
      name: JsonEntityField.PRODUCT_TYPE,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.PRODUCT_TYPE}`),
      headerName: 'Type',
      width: 140,
    },
    {
      name: JsonEntityField.BAR_CODES,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.BAR_CODES}`),
      headerName: 'Bar codes',
      width: 130,
      valueFormatter: (params) => (params.value as string[]).join(', '),
    },
    {
      name: JsonEntityField.HAS_VARIANTS,
      rule: t('Products.NotRequired'),
      field: t(`ImportFromMoysklad.${JsonEntityField.HAS_VARIANTS}`),
      headerName: 'Has variants',
      width: 140,
    },
  ]);

  const onChangeImport = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // debugger;
    if (!(e.target as HTMLInputElement).files?.[0]) {
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(t('Alert.UploadError', { error: '' }));
      return;
    }
    const buffer = await (
      e.target as HTMLInputElement
    ).files?.[0].arrayBuffer();
    const workbook = read(buffer);

    const transformToNumber = (num: unknown) => {
      return num ? +(num as string).toString().replace(',', '.') : undefined;
    };

    const transformToBoolean = (bool?: string) =>
      bool?.toLowerCase() === t('Import.BooleanYes');

    const groupName = (name: string, separator = '/') =>
      name.split(separator).splice(0).reverse()[0];

    const productType = (type?: string) => {
      if (type === t('Import.Tobacco')) {
        return 1;
      } else {
        return 0;
      }
    };

    try {
      const jsonWorkbook: Record<string, string>[] = Object.values(
        workbook.Sheets,
      )
        .map<Record<string, string>[]>((sheet) =>
          utils.sheet_to_json(sheet, {
            rawNumbers: true,
          }),
        )
        .flat();

      const groupField = importReqRows.find(
        (i) => i.name === JsonEntityField.GROUP,
      );
      if (!groupField) {
        console.error('Something went off. Group field is not found');
        return;
      }

      const jsonEntityAssociations: Record<JsonEntityField, string> =
        {} as Record<JsonEntityField, string>;
      importReqRows.map((row) => {
        jsonEntityAssociations[row.name] = row.field;
      });
      const groups = jsonWorkbook
        .map((j) => j[groupField.field])
        .filter((i) => !!i);

      const products = jsonWorkbook
        .filter((item) => !!item[jsonEntityAssociations[JsonEntityField.GROUP]])
        .map((item) => {
          return {
            [JsonEntityField.UUID]:
              item[jsonEntityAssociations[JsonEntityField.UUID]],
            [JsonEntityField.NAME]:
              item[jsonEntityAssociations[JsonEntityField.NAME]],
            [JsonEntityField.GROUP]: groupName(
              item[jsonEntityAssociations[JsonEntityField.GROUP]],
            ),
            [JsonEntityField.HAS_VARIANTS]: transformToBoolean(
              item[jsonEntityAssociations[JsonEntityField.HAS_VARIANTS]],
            ),
            [JsonEntityField.CODE]:
              item[jsonEntityAssociations[JsonEntityField.CODE]],

            [JsonEntityField.MEASURE_NAME]:
              item[jsonEntityAssociations[JsonEntityField.MEASURE_NAME]],
            [JsonEntityField.ALLOW_TO_SELL]: transformToBoolean(
              item[jsonEntityAssociations[JsonEntityField.ALLOW_TO_SELL]],
            ),
            [JsonEntityField.DESCRIPTION]:
              item[jsonEntityAssociations[JsonEntityField.DESCRIPTION]],
            [JsonEntityField.ARTICLE_NUMBER]:
              item[jsonEntityAssociations[JsonEntityField.ARTICLE_NUMBER]],
            [JsonEntityField.TAX]:
              item[jsonEntityAssociations[JsonEntityField.TAX]],
            [JsonEntityField.PRICE]: transformToNumber(
              item[jsonEntityAssociations[JsonEntityField.PRICE]],
            ),
            [JsonEntityField.COST_PRICE]: transformToNumber(
              item[jsonEntityAssociations[JsonEntityField.COST_PRICE]],
            ),
            [JsonEntityField.QUANTITY]: transformToNumber(
              item[jsonEntityAssociations[JsonEntityField.QUANTITY]],
            ),
            [JsonEntityField.BAR_CODES]:
              item[jsonEntityAssociations[JsonEntityField.BAR_CODES]]?.split(
                ' ',
              ),
            [JsonEntityField.CURRENCY]:
              item[jsonEntityAssociations[JsonEntityField.CURRENCY]],
            [JsonEntityField.COUNTRY]:
              item[jsonEntityAssociations[JsonEntityField.COUNTRY]],
            [JsonEntityField.DISCOUNT_PROHIBITED]: transformToBoolean(
              item[jsonEntityAssociations[JsonEntityField.DISCOUNT_PROHIBITED]],
            ),
            [JsonEntityField.PRODUCT_TYPE]: productType(
              item[jsonEntityAssociations[JsonEntityField.PRODUCT_TYPE]],
            ),
          };
        });
      let hasDuplicateProducts = false;

      if (products) {
        hasDuplicateProducts =
          products.filter(
            (i) =>
              products.filter((product) => product.uuid === i.uuid).length > 1,
          ).length > 0;
        if (!hasDuplicateProducts) {
          hasDuplicateProducts =
            products.filter((i) =>
              savedProducts?.find(
                (product) => product.uuid === i[JsonEntityField.UUID],
              ),
            ).length > 0;
        }
        if (hasDuplicateProducts) {
          snackbar.changeIsOpen(true);
          snackbar.changeSeverity('error');
          snackbar.changeMessage(t('Alert.DuplicatedItem'));
          snackbar.changeAutoHide(3000);
        }
      }

      if (hasDuplicateProducts) {
        return;
      }

      setGroupRows(groups);
      setRows(products);
    } catch (e) {
      console.error(e);
      snackbar.changeIsOpen(true);
      snackbar.changeSeverity('error');
      snackbar.changeMessage(
        t('Alert.UploadError', {
          error: hasTypeProperty(e, 'message') ? e.message : e,
        }),
      );
      return;
    }
  };

  const onImportRowNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    placement: number,
  ) => {
    setImportReqRows((prevState) => {
      const items = [...prevState];
      const item = { ...prevState[placement] };
      item.field = e.target.value;
      items[placement] = item;
      return items;
    });
  };

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
                <TableCell
                  variant={'head'}
                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  align="left"
                >
                  {t('Products.FieldInTable')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importReqRows.map((row, index) => (
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
                  <TableCell
                    sx={{ borderColor: 'grey.500' }}
                    component="th"
                    scope="row"
                  >
                    <AppInput
                      inputProps={{
                        type: 'text',
                        value: row.field,
                        onChange: (e) => onImportRowNameChange(e, index),
                        placeholder: row.field,
                      }}
                    />
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
              columns={importReqRows.map((i) => ({
                field: i.name,
                headerName: i.headerName,
                width: i.width,
              }))}
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
