import { useState } from 'react';

const useProductFetchRemove = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState();

  const initialize = async (id: number) => {
    try {
      const res = await fetch(`v1/products/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: '*/*',
        },
      });

      if (res.status !== 201) {
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
