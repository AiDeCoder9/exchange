import { ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { DataSource, DataSourceOptions } from 'typeorm';
import EntityList from '@/resource/entity';
const databaseConnection = (): DataSourceOptions => {
  const config = configuration();
  const configService: ConfigService = new ConfigService<
    Record<string, unknown>,
    false
  >(config);

  const dbConfig = configService.get<DatabaseConfig>('database');

  return {
    type: 'postgres',
    host: dbConfig?.host,
    port: dbConfig?.port,
    username: dbConfig?.user,
    password: dbConfig?.password,
    database: dbConfig?.database,
    entities: EntityList,
    synchronize: true,
  };
};

const connection = new DataSource(databaseConnection()).createQueryRunner();

export { databaseConnection, connection };
