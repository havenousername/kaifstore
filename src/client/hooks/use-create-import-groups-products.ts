import { useState } from 'react';
import useGetHttpUrl from './use-get-http-url';
import { JsonEntity } from '../interfaces/json-entity';

const useCreateImportGroupsProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<boolean>();
  const path = useGetHttpUrl();

  const chunkSend = async <T>(data: T[], type: 'groups' | 'products') => {
    const response = await fetch(path(`v1/import-export/${type}`), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201 && response.status !== 200) {
      const error = await response.json();
      throw new Error(error);
    }
  };

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  const initialize = async (
    groups: string[],
    items: JsonEntity[],
    size = 100,
  ) => {
    try {
      const nameGroup = groups.map((g) => ({ name: g }));

      const groupChunks = [...chunks(nameGroup, size)];
      for (const chunk of groupChunks) {
        await chunkSend(chunk, 'groups');
      }

      const productChunks = [...chunks(items, size)];
      for (const chunk of productChunks) {
        await chunkSend(chunk, 'products');
      }
      setLoading(true);

      setError(undefined);
      setLoading(false);
      setData(true);
    } catch (e) {
      setError(e);
    }
  };

  return { initialize, data, loading, error };
};

export default useCreateImportGroupsProducts;
