import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    example: 2,
    description: 'Address id',
  })
  @IsNumber({}, { message: 'Address id is not number' })
  readonly addressId: number;
}
