import { useCallback } from 'react';

const useGetHttpUrl = () => {
  const hasHttp = useCallback(
    (str: string) => str.includes('http') || str.includes('https'),
    [],
  );
  return useCallback(
    (str: string) =>
      hasHttp(str) ? str : `${process.env.NEXT_PUBLIC_ROOT_URL}/${str}`,
    [hasHttp],
  );
};

export default useGetHttpUrl;
