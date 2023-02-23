import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class ProductImage {
  // 상품이미지 id
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // 이미지 주소
  @Column()
  url: string;
  // 메인여부
  @Column()
  isMain: boolean;
  // 생성일자
  @CreateDateColumn()
  createAt: Date;
  // 삭제일자
  @DeleteDateColumn()
  deleteAt: Date;
  // 상품id
  @ManyToOne(() => Product)
  product: Product;
}
