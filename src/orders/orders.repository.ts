import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from 'src/users/user.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';
import { Product } from 'src/products/products.entity';
import { UsersRepository } from 'src/users/users.repository';
import { ProductCartDto } from 'src/products/dto/productsCartDto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async addOrder(userId: string, products: ProductCartDto[]) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException('Usuario no encontrado.');

      let total = 0;
      const productEntities = [];

      // Validar y preparar productos
      for (const item of products) {
        const idProducto = item.id;
        const quantity = item.quantity;

        const product = await this.productRepository.findOneBy({
          id: idProducto,
        });

        const nameProducto = product.name;

        if (!product)
          throw new NotFoundException(`Producto no encontrado: ${idProducto}`);
        if (product.stock <= 0)
          throw new NotFoundException(`Producto ${nameProducto} agotado.`);
        if (product.stock < quantity)
          throw new NotFoundException(`Cantidad insuficiente.`);

        total += product.price * quantity;
        productEntities.push({ product, quantity });
      }

      // Crear la orden
      const orderTable = new Order();
      orderTable.user_id = user;
      orderTable.date = new Date();
      await this.orderRepository.save(orderTable);

      // Crear detalles
      const orderDetailsTable = new OrderDetails();
      orderDetailsTable.order_id = orderTable;
      orderDetailsTable.products_id = productEntities;
      orderDetailsTable.price = total;
      await this.orderDetailsRepository.save(orderDetailsTable);

      // Descontar stock
      for (const p of productEntities) {
        p.product.stock -= p.quantity;
        await this.productRepository.save(p.product);
      }

      return {
        orderId: orderTable.id,
        total,
        orderDetailId: orderDetailsTable.id,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: id },
        relations: {
          orderDetails: {
            products_id: true,
          },
        },
      });
      if (!order) {
        throw new NotFoundException('No encontrado.');
      }
      return order;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getOrderIdUser(id: string) {
    try {
      await this.usersRepository.getUserId(id);

      const orders = await this.orderRepository.find({
        where: { user_id: { id: id } },
      });

      if (orders.length === 0) {
        throw new NotFoundException('No se encontraron Ordenes.');
      }

      return orders;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
