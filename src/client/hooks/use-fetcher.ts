import { useContext } from 'react';
import { BaseUrl, BaseUrlContext } from '../context/baseurl.context';
import fetcher from '../api/root-fetcher';

const useFetcher = () => {
  const { baseUrl } = useContext<BaseUrl>(BaseUrlContext);
  return fetcher(baseUrl);
};

export default useFetcher;
