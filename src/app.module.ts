import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/Auth.module';
import { configModule, databaseConfig } from './config/database.config';
import { CategoriesModule } from './categories/categories.module';
import { OrderDetailsModule } from './orderDetails/orderDetails.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/fileUpload.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    configModule,
    databaseConfig,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
    OrderDetailsModule,
    OrdersModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '300' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
