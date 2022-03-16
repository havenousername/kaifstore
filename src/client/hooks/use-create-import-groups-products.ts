import { useState } from 'react';
import useGetHttpUrl from './use-get-http-url';
import { JsonEntity } from '../interfaces/json-entity';

const useCreateImportGroupsProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<JsonEntity[]>();
  const path = useGetHttpUrl();

  const initialize = async (items: JsonEntity[]) => {
    try {
      console.log(items);
      const res = await fetch(path(`v1/import-export`), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      });

      if (res.status !== 201 && res.status !== 200) {
        const error = await res.json();
        setError(error);
        return;
      }

      setError(undefined);
      setLoading(false);
      const data = await res.json();
      setData(data);
    } catch (e) {
      setError(e);
    }
  };

  return { initialize, data, loading, error };
};

export default useCreateImportGroupsProducts;
