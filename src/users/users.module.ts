import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UsersDbService } from './usersDb.service';
import { Order } from 'src/orders/order.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [UsersController],
  providers: [UsersDbService, UsersRepository, AuthService],
  exports: [UsersRepository, UsersDbService],
})
export class UsersModule {}
