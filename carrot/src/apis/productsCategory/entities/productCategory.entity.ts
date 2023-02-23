import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
