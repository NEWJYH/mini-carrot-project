import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Dropout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => User)
  user: User;
}
