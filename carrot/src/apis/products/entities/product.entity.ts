import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @Column({ type: `text` })
  description: string;

  // 상품 가격
  @Column()
  price: number;

  // 가격 제안 여부
  @Column({ default: false })
  proposition: boolean;

  // 관심수
  @Column({ default: 0 })
  likeCount: number;

  // 조회수
  @Column({ default: 0 })
  viewCount: number;

  // 나눔 여부
  @Column({ default: false })
  sharing: boolean;

  // 생성 일자
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // 삭제 일자
  @Column({ nullable: true })
  deletedAt: Date | null;

  // 업데이트 일자
  @UpdateDateColumn()
  updatedAt: Date;

  // 끌올 일자
  @Column({ nullable: true })
  refreshedAt: Date | null;

  // 상품판매 false 면 판매중 : true면 거래예약잡힘
  @Column({ default: false })
  status: boolean;

  // 상품 판매 완료시간
  @Column({ nullable: true })
  soldedAt: Date | null;

  @Column({ default: false })
  // 상품 판매 완료시 True
  isSoldout: boolean;

  // 판매자 id
  @ManyToOne(() => User)
  seller: User;

  // 구매자 id
  @ManyToOne(() => User)
  buyer: User;

  // 카테고리 id
  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  // 상품 거래 위치 id  - 1대 1 관계
  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  // N: M 관계(상품: 상품태그)
  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
