import { ChattingRoom } from 'src/apis/chattingRooms/entities/chattingRoom.entity';
import { User } from 'src/apis/users/entities/user.entity';

import {
  ManyToOne,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ChattingMessage {
  // 채팅 메시지 ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 채팅메시지
  @Column()
  message: string;

  // 읽기 여부
  @Column()
  status: boolean;

  // 생성일자
  @CreateDateColumn()
  createdAt: Date;

  //발신인 아이디
  @ManyToOne(() => User)
  user: User;

  // 수신인 아이디
  @ManyToOne(() => ChattingRoom)
  chattingRoom: ChattingRoom;
}
