import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  // 고유 아이디
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // 이메일
  @Column()
  @Field(() => String)
  email: string;

  // 비밀번호
  @Column()
  @Field(() => String)
  password: string;

  //설정닉네임
  @Column()
  @Field(() => String)
  nickName: string;

  //휴대폰번호
  @Column()
  @Field(() => String)
  mobileNumber: string;

  //거래사용 포인트
  @Column()
  @Field(() => Int)
  point: number;

  // 매너온도
  @Column()
  @Field(() => Int)
  mannerTemperature: number;

  //로그인 상태
  @Column()
  @Field(() => Boolean)
  isLogin: boolean;

  // 자동생성으로 만든날짜
  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  createdAt: Date;

  // 삭제여부
  @Column({ default: false })
  @Field(() => Boolean)
  isDelete: boolean;

  //업데이트 날짜
  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
