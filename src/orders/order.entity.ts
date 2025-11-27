import { OrderDetails } from "src/orderDetails/orderDetails.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, user => user.orders_id)
  user_id: User

  @Column({ type: 'date' }) //la fecha se debe generar de acuerdo a la fecha de la orden
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails)=>orderDetails.order_id ) // profundizar en 1 a 1
  @JoinColumn()
  orderDetails: OrderDetails;
}