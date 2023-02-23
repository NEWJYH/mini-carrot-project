import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  // 고유 아이디
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 이메일
  @Column()
  email: string;

  // 비밀번호
  @Column()
  password: string;

  //설정닉네임
  @Column()
  nickName: string;

  //휴대폰번호
  @Column()
  mobileNumber: string;

  //거래사용 포인트
  @Column()
  point: number;

  // 매너온도
  @Column()
  mannerTemperature: number;

  //로그인 상태
  @Column()
  isLogin: boolean;

  // 자동생성으로 만든날짜
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // 삭제여부
  @Column()
  isDelete: boolean;

  //업데이트 날짜
  @Column()
  updatedAt: Date;
}
