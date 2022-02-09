import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoggerEntity } from './entity/logger.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Logger extends ConsoleLogger {
  constructor(
    @InjectRepository(LoggerEntity)
    private readonly loggerEntityRepository: Repository<LoggerEntity>,
  ) {
    super();
  }
  override error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    return this.loggerEntityRepository
      .save({
        message,
        stack,
        context,
        isError: true,
        jobTag: 'global',
      })
      .catch((e) => console.error(e));
  }
}
