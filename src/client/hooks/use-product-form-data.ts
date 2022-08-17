import useSWRImmutable from 'swr/immutable';
import { ProductGroup } from '../../backend/model/product-groups.model';
import { Discount } from '../../backend/model/discounts.model';
import useProductSchema from './use-product-schema';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { EditableProduct } from '../interfaces/product-editable';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductMeasure, productMeasures } from '../interfaces/product-measure';
import { useEffect, useState } from 'react';
import { SelectValue } from '../interfaces/input-props';
import useFetcher from './use-fetcher';

const useProductFormData = () => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { data } = useSWRImmutable<{
    items: ProductGroup[];
    meta: any;
  }>('v1/product-groups', fetcher);

  const { data: discounts } = useSWRImmutable<Discount[]>(
    'v1/discounts',
    fetcher,
  );

  const schema = useProductSchema(t);

  const form = useForm<EditableProduct>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      price: 1,
      costPrice: 0,
      group: '',
      characteristics: [],
      quantity: 1,
      barCodes: [],
      productType: 0,
      allowToSell: true,
      measureName: ProductMeasure.PIECE,
      code: '',
      articleNumber: 0,
      description: '',
      discounts: [],
      hasBarcode: false,
    },
  });

  const [selectableGroups, setSelectableGroups] = useState<SelectValue[]>([]);
  const [selectableDiscounts, setSelectableDiscounts] = useState<SelectValue[]>(
    [],
  );
  const [productTypes] = useState<SelectValue[]>([
    { value: '1', content: t('Products.TypeStandard') },
    { value: '2', content: t('Products.TypeTobaccoMarked') },
  ]);
  const [productMeasureTypes] = useState<SelectValue[]>(
    productMeasures.map((i) => ({ content: i as string, value: i as string })),
  );

  useEffect(() => {
    if (data) {
      const selectable = data.items.map((group) => ({
        value: group.uuid,
        content: group.name,
      }));
      setSelectableGroups(selectable);
    }
  }, [data]);

  useEffect(() => {
    if (discounts) {
      const selectable = discounts.map((discount) => ({
        value: String(discount.id),
        content: discount.name,
      }));
      setSelectableDiscounts(selectable);
    }
  }, [discounts]);

  return {
    form,
    selectableGroups,
    selectableDiscounts,
    productTypes,
    productMeasureTypes,
  };
};

export default useProductFormData;
