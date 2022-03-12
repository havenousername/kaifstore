import { useCallback } from 'react';

const useGetHttpUrl = () => {
  const hasHttp = useCallback((str: string) => {
    return (!!str && str.includes('http')) || str.includes('https');
  }, []);
  return useCallback(
    (str: string) =>
      !!str && hasHttp(str)
        ? str
        : `${process.env.NEXT_PUBLIC_ROOT_URL}/${str}`,
    [hasHttp],
  );
};

export default useGetHttpUrl;
