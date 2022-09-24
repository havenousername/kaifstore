import { useState } from 'react';
import useGetHttpUrl from './use-get-http-url';

const useApiMethod = <Data, Params>(
  getPath: (params: Params) => string,
  changeData: (d: any) => Data,
  init: RequestInit,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<Data>();
  const path = useGetHttpUrl();

  const initialize = async (params: Params, requestInit?: RequestInit) => {
    try {
      const res = await fetch(path(getPath(params)), requestInit ?? init);

      if (res.status !== 201 && res.status !== 200) {
        const error = await res.json();
        setError(error);
        return;
      }

      setError(undefined);
      setLoading(false);
      try {
        const data = await res.json();
        setData(changeData(data));
      } catch (e) {
        setData(changeData(true));
      }
    } catch (e) {
      setError(e);
    }
  };

  return { initialize, data, loading, error };
};

export default useApiMethod;
