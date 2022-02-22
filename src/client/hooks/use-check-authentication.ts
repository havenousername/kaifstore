import useSWR, { mutate } from 'swr';
import standardFetcher from '../api/standard-fetcher';
import { UserAuthenticated } from '../context/authenticated.context';
import { User } from '../../backend/model/users.model';
import { FetchResValidations } from '../interfaces/fetches';

const useCheckAuthentication = (): UserAuthenticated & FetchResValidations => {
  const { data, error } = useSWR<User>('/v1/auth', standardFetcher, {
    revalidateIfStale: false,
  });

  const checkAuthentication = async () => {
    await mutate('/v1/auth', data, true);
  };

  return {
    user: error ? undefined : data,
    authenticated: !!data && !error,
    isError: error,
    isLoading: !error && !data,
    checkAuthentication,
  };
};

export default useCheckAuthentication;
