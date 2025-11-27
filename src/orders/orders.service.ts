import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { ProductCartDto } from 'src/products/dto/productsCartDto';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async addOrder(userId: string, products: ProductCartDto[]) {
    return await this.orderRepository.addOrder(userId, products);
  }

  async getOrder(id: string) {
    return await this.orderRepository.getOrder(id);
  }

  async getOrderIdUser(id: string) {
    return await this.orderRepository.getOrderIdUser(id);
  }
}
