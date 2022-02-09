import { Module } from '@nestjs/common';
import { LoggerModule } from './logger.module';
import { Logger } from './logger';

@Module({
  imports: [LoggerModule],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerHttpModule {}
