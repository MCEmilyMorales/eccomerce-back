import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

import { Category } from './categories.entity';
import * as data from '../utils/data.json';

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

  // se alimenta de un json
  // async addCategories(categorie) {
  //   data?.map(async (prop) => {
  //     await this.categoryRepository
  //       .createQueryBuilder() //se puede acceder al metodo gracias a Repository
  //       .insert() //se utiliza para crear y ejecutar consultas
  //       .into(Category)
  //       .values({ name: prop.category })
  //       .orIgnore() //declaración de ignorar adicional compatible con las bases de datos.
  //       .execute();
  //   });
  //   return 'categorias agregadas';
  // }
}
