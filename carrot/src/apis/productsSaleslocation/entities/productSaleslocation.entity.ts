import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSaleslocation {
  // 거래 위치 아이디
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // 거래 주소
  @Column()
  @Field(() => String)
  address: string;

  // 거래 상세주소
  @Column()
  @Field(() => String)
  addressDetail: string;

  // 위도
  @Column({ type: 'double' })
  @Field(() => Float)
  latitude: number;

  // 경도
  @Column({ type: 'double' })
  @Field(() => Float)
  logitude: number;

  // 거래 예정시각
  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  meetingTime: Date | null;
}

// product와 1대1 관계
