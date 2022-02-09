import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceModule } from './device.module';
import { UserHttpModule } from '../user/user-http.module';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [DeviceModule, UserHttpModule],
  exports: [DeviceService],
})
export class DeviceHttpModule {}
