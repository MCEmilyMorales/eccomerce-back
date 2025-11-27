import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersDbService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }

  getUserId(userId: string) {
    return this.usersRepository.getUserId(userId);
  }

  async putUserUpdate(id: string, newUser) {
    return await this.usersRepository.putUserUpdate(id, newUser);
  }

  async deleteUserDelete(id: string) {
    return await this.usersRepository.deleteUserDelete(id);
  }
}
