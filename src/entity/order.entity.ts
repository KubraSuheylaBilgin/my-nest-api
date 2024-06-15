import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  serviceId: number;

  @Column()
  amount: number;

  @Column()
  userId: number;
}
