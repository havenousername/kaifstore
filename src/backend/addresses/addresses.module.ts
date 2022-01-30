import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from '../model/addresses.model';

@Module({
  providers: [AddressesService],
  imports: [SequelizeModule.forFeature([Address])],
  exports: [AddressesService],
})
export class AddressesModule {}
