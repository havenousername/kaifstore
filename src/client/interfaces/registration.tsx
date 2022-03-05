import { User } from '../../backend/model/users.model';

export type RegisterUser = Pick<
  User,
  'firstName' | 'lastName' | 'password' | 'birthDate'
> & { confirmPassword: string; gender: string };

export type RegisterDataFull<T> = {
  placeholder: string;
  error: boolean;
  errorText: string;
  data: T;
};

export type ValidationRules = {
  name: '';
};

export type RegisterUserFull = {
  [Prop in keyof RegisterUser]: RegisterDataFull<RegisterUser[Prop]>;
};
