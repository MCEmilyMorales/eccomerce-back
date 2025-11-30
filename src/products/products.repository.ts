import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './products.entity';
import { Category } from 'src/categories/categories.entity';
import { ProductDto } from './dto/productsDto';

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

  async getProductName(name: string) {
    try {
      const producto = await this.productRepository.findOneBy({ name: name });
      if (!producto) {
        throw new NotFoundException('Producto no encontrado.');
      }
      return producto;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addProduct(productDto: ProductDto) {
    try {
      const categories = await this.categoriesRepository.find();

      const category = categories.find(
        (cat) => cat.name === productDto.category,
      );

      if (!category) {
        throw new NotFoundException(`Category not found`);
      }
      //verificar de que NO exista el nombre del producto
      const productExist = await this.productRepository.findOneBy({
        name: productDto.name,
      });

      if (productExist) {
        throw new ConflictException('Ese producto ya existe.');
      }
      //cambiar el dato de la categoria
      const datos = { ...productDto, category };

      const product = this.productRepository.create(datos);

      const productNew = await this.productRepository.save(product);

      if (!productNew) {
        throw new ConflictException(`Error al crear el producto.`);
      }

      return productNew;
    } catch (error: unknown) {
      console.error(error);

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
