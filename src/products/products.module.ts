import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Category } from 'src/categories/categories.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])], //el producto depende de las categorias
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryConfig, ProductsRepository],
})
export class ProductsModule {}
