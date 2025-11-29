import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { Order } from 'src/orders/order.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
