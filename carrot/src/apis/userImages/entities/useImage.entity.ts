import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserImage {
  // 유저이미지ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 유저URL
  @Column()
  url: string;

  // 생성일자
  @CreateDateColumn()
  createdAt: Date;

  // 유저ID
  @ManyToOne(() => User)
  user: User;
}
