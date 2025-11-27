import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/categories.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from 'src/file-upload/fileUpload.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])], //el producto depende de las categorias
  controllers: [ProductsController],
  providers: [ProductsService,CloudinaryConfig, ProductsRepository]
})
export class ProductsModule {}
