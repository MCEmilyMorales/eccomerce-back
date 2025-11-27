import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  database: process.env.DATA_BASE,
  host: process.env.HOST,
  port: process.env.PORT as unknown as number,
  password: process.env.PASSWORD,
  username: process.env.USER,
  autoLoadEntities: true,
  synchronize: true,
};
export default registerAs('typeorm', () => config); //permite tener una clave con el nombre de typeORM e importar el objeto config
export const connectionSource = new DataSource(config as DataSourceOptions);
