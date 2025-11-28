import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';

//!comunicacion con la db + cloudinary- 17-18
@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(file, id: string) {
    const saveFile = await this.fileUploadRepository.uploadImage(file);
    const findProduct = await this.productsRepository.findOneBy({ id: id });
    if (!findProduct)
      throw new NotFoundException('No se encontro el producto!!!!');
    findProduct.imgUrl = saveFile.secure_url;
    const saveFindProduct = this.productsRepository.save(findProduct);
    return saveFindProduct;
  }
}
