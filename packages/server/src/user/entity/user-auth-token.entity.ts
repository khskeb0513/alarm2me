import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_auth_token')
export class UserAuthTokenEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (object) => object.id)
  @JoinColumn({ name: 'user_id' })
  userId!: UserEntity;

  @Column({
    type: 'uuid',
    name: 'auth_token',
    default: () => 'UUID()',
    unique: true,
  })
  authToken!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
