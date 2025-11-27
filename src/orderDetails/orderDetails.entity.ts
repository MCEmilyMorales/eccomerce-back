import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'ordersDetails' })
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetails)
  order_id: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails_id)
  products_id: Product[];
}
