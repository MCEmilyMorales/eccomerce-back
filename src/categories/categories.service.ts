import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }

  async addCategories(categorie: string) {
    return await this.categoriesRepository.addCategories(categorie);
  }
}
