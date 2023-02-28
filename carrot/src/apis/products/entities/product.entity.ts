import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
@ObjectType()
export class Product {
  // 고유 아이디
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // 상품 제목
  @Column()
  @Field(() => String)
  title: string;

  // 상품 설명
  @Column({ type: `text` })
  @Field(() => String)
  description: string;

  // 상품 가격
  @Column()
  @Field(() => Int)
  price: number;

  // 가격 제안 여부
  @Column({ default: false })
  @Field(() => Boolean)
  proposition: boolean;

  // 관심수
  @Column({ default: 0 })
  @Field(() => Int)
  likeCount: number;

  // 조회수
  @Column({ default: 0 })
  @Field(() => Int)
  viewCount: number;

  // 나눔 여부
  @Column({ default: false })
  @Field(() => Boolean)
  sharing: boolean;

  // 생성 일자
  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => Date)
  createdAt: Date;

  // 삭제 일자
  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  // 업데이트 일자
  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  // 끌올 일자
  @Column({ nullable: true })
  @Field(() => Date || null)
  refreshedAt: Date | null;

  // 상품판매 false 면 판매중 : true면 거래예약잡힘
  @Column({ default: false })
  @Field(() => Boolean)
  status: boolean;

  // 상품 판매 완료시간
  @Column({ nullable: true })
  @Field(() => Date || null)
  soldedAt: Date | null;

  // 상품 판매 완료시 True
  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  // 판매자 id
  @ManyToOne(() => User, { nullable: false })
  @Field(() => User, { nullable: false })
  seller: User;

  // 구매자 id
  @ManyToOne(() => User, { nullable: true })
  @Field(() => User, { nullable: true })
  buyer: User;

  // 카테고리 id
  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  // 상품 거래 위치 id  - 1대 1 관계
  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  // N: M 관계(상품: 상품태그)
  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
