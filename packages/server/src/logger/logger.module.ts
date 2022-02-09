import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from './entity/logger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerEntity])],
  exports: [TypeOrmModule],
})
export class LoggerModule {}
