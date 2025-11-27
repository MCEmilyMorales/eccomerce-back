import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductId(id: string) {
    return this.productsRepository.getProductId(id);
  }

  async addProduct(productDto) {
    return await this.productsRepository.addProduct(productDto);
  }

  async deleteProduct(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }

  async putProducto(id: string, newData) {
    return await this.productsRepository.putProducto(id, newData);
  }
}
