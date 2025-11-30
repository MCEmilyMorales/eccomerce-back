import { Category } from 'src/categories/categories.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', default: 'img#' })
  imgUrl: string;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products_id)
  @JoinTable()
  orderDetails_id: OrderDetails[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
