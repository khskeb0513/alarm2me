import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTokenEntity } from './entity/device-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceTokenEntity])],
  exports: [TypeOrmModule],
})
export class DeviceModule {}
