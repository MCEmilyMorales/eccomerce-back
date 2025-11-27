import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Products } from './productsInterfacePrueba/productsInterfacePrueba';
import { Product } from './products.entity';
import * as data from '../utils/data.json';
import { Category } from 'src/categories/categories.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductId(id: string) {
    try {
      const producto = await this.productRepository.findOneBy({ id });
      return producto;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw Error();
    }
  }

  async addProduct(productDto) {
    try {
      const categories = await this.categoriesRepository.find();

      const category = categories.find(
        (cat) => cat.name === productDto.category,
      );

      if (!category) {
        throw new NotFoundException(`Category not found`);
      }
      //cambiar el datos del nombre al id
      productDto.category = category.id;

      const product = this.productRepository.create(productDto);
      console.log('product', product);

      const productNew = await this.productRepository.save(product);
      if (!productNew.values) {
        throw new ConflictException(
          `Category not found: ${productDto.category}`,
        );
      }
      console.log('productNew', productNew);

      return productNew;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  async deleteProduct(id: string) {
    try {
      const deleteProduct = await this.productRepository.delete(id);
      if (!deleteProduct.affected) {
        throw new NotFoundException('No se encontro id del producto');
      }
      return { message: 'Producto eliminado con exito.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new Error();
    }
  }

  async putProducto(id: string, newData) {
    try {
      const updateProduct = await this.productRepository.update(id, newData);
      if (!updateProduct.affected) {
        throw new NotFoundException('Producto no encontrado.');
      }
      return { message: 'Producto actualizado con exito.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}

// async addProducts(products: Product[]):Promise<Product[]>{
//   return await this.productRepository.save(products)
// }
