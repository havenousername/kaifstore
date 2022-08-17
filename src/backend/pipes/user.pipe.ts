import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class UserPipe implements PipeTransform<UpdateUserDto> {
  transform(value: Record<keyof UpdateUserDto, any>): UpdateUserDto {
    return {
      email: value.email,
      password: value.password ? value.password : undefined,
      confirmPassword: value.confirmPassword
        ? value.confirmPassword
        : undefined,
      firstName: value.firstName ?? undefined,
      lastName: value.lastName ?? undefined,
      gender: value.gender,
      birthDate: value.birthDate ? new Date(value.birthDate) : undefined,
      address: value.address ? JSON.parse(value.address) : undefined,
      roleId: value.roleId ? Number(value.roleId) : undefined,
      addressId: value.addressId ? Number(value.addressId) : undefined,
    };
  }
}
