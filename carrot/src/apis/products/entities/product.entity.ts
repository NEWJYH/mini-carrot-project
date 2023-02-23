import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  // 고유 아이디
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 상품 제목
  @Column()
  title: string;

  // 상품 설명
  @Column()
  description: string;

  // 상품 가격
  @Column()
  price: number;

  // 가격 제안 여부
  @Column()
  proposition: boolean;

  // 관심수
  @Column()
  likeCount: number;

  // 조회수
  @Column()
  viewCount: number;

  // 나눔 여부
  @Column()
  sharing: boolean;

  // 생성 일자
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // 삭제 일자
  @DeleteDateColumn()
  deletedAt: Date;

  // 업데이트 일자
  @Column()
  updatedAt: Date;

  // 끌올 일자
  @Column()
  refreshedAt: Date;

  // 상품판매 false 면 판매중 : true면 거래예약잡힘
  @Column({ default: false })
  status: boolean;

  @Column({ default: false })
  // 상품 판매 완료시 True
  isSoldout: boolean;

  // 판매자 id
  @ManyToOne(() => User)
  seller: User;

  // 구매자 id
  @JoinTable()
  @ManyToMany(() => User)
  buyer?: User;

  // 카테고리 id
  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  // 상품 거래 위치 id
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;
}
