import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  eMail: string;

  @Column()
  password: string;

  @Column('decimal', {
    precision: 19,
    scale: 2,
  })
  balance: number;
}
