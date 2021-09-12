import { Gender } from '../interfaces/gender';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: Gender;
  readonly birthDate: Date;
}
