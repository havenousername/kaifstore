import { useState } from 'react';
import { EditableProduct } from '../interfaces/product-editable';
import { useFilesFromUrl } from './get-file-from-url';

const useProductFetchCall = (type: 'create' | 'change') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const getFilesFromUrl = useFilesFromUrl();

  const initialize = async (product: EditableProduct, images: string[]) => {
    const formData = new FormData();
    setLoading(true);
    if (type === 'create') {
      formData.append('_method', 'POST');
    } else {
      formData.append('_method', 'PUT');
    }

    const imageMap: [string, string][] = images.map((image) => [
      image,
      image.substring(image.indexOf('/') + 1, image.lastIndexOf('.')),
    ]);

    const imageFiles = await getFilesFromUrl(imageMap);
    const sendProduct = {
      ...product,
      characteristics: product.characteristics.map((i) => i.value),
      discounts: product.discounts.map((i) => +i.value),
      barCodes: product.hasBarcode ? product.barCodes.map((i) => i.value) : [],
      groupId: product.group,
    };

    imageFiles.forEach((image) => formData.append('images', image));

    for (const key in sendProduct) {
      const value = sendProduct[key];
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value) {
        formData.append(key, value);
      }
    }

    const res = await fetch('/v1/products', {
      method: type === 'create' ? 'POST' : 'PUT',
      headers: {
        Accept: '*/*',
      },
      body: formData,
    });

    if (res.status !== 201) {
      setError(res.json());
      return;
    }

    setLoading(false);
    return res.json();
  };

  return [initialize, loading, error];
};

export default useProductFetchCall;
