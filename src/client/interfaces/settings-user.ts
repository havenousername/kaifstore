import { User } from '../../backend/model/users.model';

export type EditableUser = Pick<
  User,
  'photo' | 'firstName' | 'lastName' | 'gender' | 'birthDate' | 'password'
> & {
  newPassword?: string;
  confirmPassword?: string;
};
