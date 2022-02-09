import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { DeviceTypeTagType } from '@alarm2me/dto/dist/user/type/device-type-tag.type';

@Entity('device_token')
@Index(['userId', 'deviceNickname'], { unique: true })
@Index(['token'])
export class DeviceTokenEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (object) => object.id)
  @JoinColumn({ name: 'user_id' })
  userId!: UserEntity;

  @Column({ name: 'device_model' })
  deviceModel!: string;

  @Column({ name: 'device_nickname' })
  deviceNickname!: string;

  @Column({ name: 'device_type_tag' })
  deviceTypeTag!: DeviceTypeTagType;

  @Column()
  token!: string;

  @Column({ type: 'timestamp', name: 'last_used', nullable: true })
  lastUsed: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
