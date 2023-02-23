import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ChattingRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  product: Product;
}
