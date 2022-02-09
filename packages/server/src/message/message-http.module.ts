import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { DeviceHttpModule } from '../device/device-http.module';
import { UserHttpModule } from '../user/user-http.module';

@Module({
  imports: [DeviceHttpModule, UserHttpModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageHttpModule {}
