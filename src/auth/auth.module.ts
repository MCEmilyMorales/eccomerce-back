import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Order } from 'src/orders/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order]), UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
