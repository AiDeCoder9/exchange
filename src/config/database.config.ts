import { ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { DataSource, DataSourceOptions } from 'typeorm';
import EntityList from '@/resource/entity';
import { dataSourceOptions } from 'data-source';
const databaseConnection = (): DataSourceOptions => {
  console.log('connection', __dirname);
  const config = configuration();
  const configService: ConfigService = new ConfigService<
    Record<string, unknown>,
    false
  >(config);

  const dbConfig = configService.get<DatabaseConfig>('database');

  return {
    ...dataSourceOptions,
    port: dbConfig?.port,
  } as DataSourceOptions;
};

const connection = new DataSource(databaseConnection());

connection
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  });
export { databaseConnection };

export default connection;
