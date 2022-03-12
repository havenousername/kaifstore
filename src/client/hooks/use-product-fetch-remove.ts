import { useState } from 'react';
import useGetHttpUrl from './use-get-http-url';

const useProductFetchRemove = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState();
  const path = useGetHttpUrl();

  const initialize = async (id: number) => {
    try {
      const res = await fetch(path(`v1/products/${id}`), {
        method: 'DELETE',
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

export default useProductFetchRemove;
