import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({type:'varchar', nullable: false})
  password: string

  @Column({type:'text'})
  address: string;

  @Column({type:'varchar'})
  phone: number;

  @Column({type:'varchar', length: 50 })
  country?: string | undefined;

  @Column({type:'varchar', length: 50})
  city?: string | undefined;

  @Column({default: false})
  isAdmin: boolean
  
  @OneToMany(()=> Order, (order)=> order.user_id)
  orders_id?: Order[]
}
