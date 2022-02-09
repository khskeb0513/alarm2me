import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserAuthTokenEntity } from './entity/user-auth-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAuthTokenService {
  constructor(
    @InjectRepository(UserAuthTokenEntity)
    private readonly userAuthTokenEntityRepository: Repository<UserAuthTokenEntity>,
  ) {}

  public async create(userId: number) {
    return this.userAuthTokenEntityRepository.save({
      userId: { id: userId },
    });
  }

  public async findOne(userId: number) {
    return this.userAuthTokenEntityRepository.findOne({
      where: {
        userId,
      },
    });
  }
}
