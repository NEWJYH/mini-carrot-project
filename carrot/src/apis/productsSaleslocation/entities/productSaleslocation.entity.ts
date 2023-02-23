import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSaleslocation {
  // 거래 위치 아이디
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 거래 주소
  @Column()
  address: string;

  // 거래 상세주소
  @Column()
  addressDetail: string;

  // 위도
  @Column({ type: 'decimal' })
  latitude: number;

  // 경도
  @Column({ type: 'decimal' })
  logitude: number;

  // 거래 예정시각
  @Column()
  meetingTime: Date;
}
