import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from './src/config/configuration';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: configuration().database.database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  host: configuration().database.host,
  username: configuration().database.user,
  password: configuration().database.password,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
