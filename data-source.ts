import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  host: process.env.DATABASE_HOST,
  username: 'postgres',
  password: 'postgres',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
