import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm'

export const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [typeOrmConfig],
})
export const databaseConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => 
    configService.get('typeorm')
});

