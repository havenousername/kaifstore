import { useCallback, useContext } from 'react';
import { BaseUrl, BaseUrlContext } from '../context/baseurl.context';

const useGetHttpUrl = () => {
  const hasHttp = useCallback((str: string) => {
    return (!!str && str.includes('http')) || str.includes('https');
  }, []);
  const { baseUrl } = useContext<BaseUrl>(BaseUrlContext);
  return useCallback(
    (str: string) => (!!str && hasHttp(str) ? str : `${baseUrl}/${str}`),
    [hasHttp, baseUrl],
  );
};

export default useGetHttpUrl;
