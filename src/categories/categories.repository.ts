import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error();
    }
  }

  async addCategories(categorie: string): Promise<Category> {
    try {
      const categorieNew = this.categoryRepository.create({
        name: categorie,
      });
      await this.categoryRepository.save(categorieNew);
      return categorieNew;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error();
    }
  }
}
