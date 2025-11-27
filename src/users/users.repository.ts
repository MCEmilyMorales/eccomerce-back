import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.usersRepository.find();
  }

  async getUserId(userId: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado.');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async postUserCreate(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async putUserUpdate(id: string, newUser) {
    try {
      const datosNewActualizados = await this.usersRepository.update(
        id,
        newUser,
      );
      if (!datosNewActualizados.affected) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return { message: 'Usuario actualizado con exito.' };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error();
    }
  }

  async deleteUserDelete(id: string) {
    try {
      // el administrador deberia eliminar a 1 usuario en especifico-
      const usuarioEliminado = await this.usersRepository.delete(id);
      if (!usuarioEliminado.affected) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return { message: 'Usuario eliminado con exito.' };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error();
    }
  }
}
