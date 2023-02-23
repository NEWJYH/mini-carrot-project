import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Wish {
  // 관심상품아이디
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // 생성일자
  @CreateDateColumn()
  createdAt: Date;
  // 삭제일자
  @DeleteDateColumn()
  deletedAt: Date;

  // 유저ID
  @ManyToOne(() => User)
  user: User;
  // 상품ID
  @ManyToOne(() => Product)
  product: Product;
}
