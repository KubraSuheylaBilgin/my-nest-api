import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  productName: string;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column()
  userId: string;


}