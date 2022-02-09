import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthTokenEntity } from './entity/user-auth-token.entity';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @InjectRepository(UserAuthTokenEntity)
    private readonly userAuthTokenEntityRepository: Repository<UserAuthTokenEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const insert = this.userEntityRepository.create(createUserDto);
    return this.userEntityRepository.save(insert);
  }

  public async findByUserAuthToken(userAuthToken: string) {
    const response = await this.userAuthTokenEntityRepository.findOne({
      where: { authToken: userAuthToken },
      relations: ['userId'],
    });
    if (!response) return null;
    return response.userId;
  }

  findOne(id: number) {
    return this.userEntityRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userEntityRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userEntityRepository.softDelete(id);
  }

  public async createAuthLink(authToken: string) {
    const response = await axios.post(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env['FIREBASE_API_KEY']}`,
      {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://alarm2me.page.link',
          link: `https://alarm2.me/v1/auth/token/${authToken}?link_type=auth_token`,
          androidInfo: {
            androidPackageName: 'me.alarm2.app',
          },
          iosInfo: {
            iosBundleId: 'me.alarm2.app',
          },
        },
        suffix: {
          option: 'UNGUESSABLE',
        },
      },
    );
    return response.data.shortLink;
  }
}
