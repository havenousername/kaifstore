import { User } from '../../backend/model/users.model';
import { createContext } from 'react';

export interface UserAuthenticated {
  user?: User;
  authenticated: boolean;
  checkAuthentication: () => Promise<void>;
}

const sampleAuthenticated: UserAuthenticated = {
  checkAuthentication: async () => new Promise(() => null),
  authenticated: false,
};

export const AuthenticationContext =
  createContext<UserAuthenticated>(sampleAuthenticated);
