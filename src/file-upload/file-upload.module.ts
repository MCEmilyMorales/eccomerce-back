import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryConfig } from 'src/config/cloudinary';

import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadRepository } from './file-upload.repository';
import { Product } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
})
export class FileUploadModule {}
