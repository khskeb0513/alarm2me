import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('github_oauth')
export class GithubOauthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (object) => object.id)
  @JoinColumn({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'profile_id', unique: true })
  profileId!: string;
}
