import useSWR, { useSWRConfig } from 'swr';
import standardFetcher from '../api/standard-fetcher';
import { UserAuthenticated } from '../context/authenticated.context';
import { User } from '../../backend/model/users.model';
import { FetchResValidations } from '../interfaces/fetches';

const useCheckAuthentication = (): UserAuthenticated & FetchResValidations => {
  const { data, error } = useSWR<User>('/v1/auth', standardFetcher);
  const { mutate } = useSWRConfig();

  const checkAuthentication = async () => {
    await mutate('/v1/auth', {}, true);
  };

  return {
    user: data,
    authenticated: !!data,
    isError: error,
    isLoading: !error && !data,
    checkAuthentication,
  };
};

export default useCheckAuthentication;
