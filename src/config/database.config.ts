import { ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import EntityList from '@/resource/entity';
const databaseConnection = (): PostgresConnectionOptions => {
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
  };
};

export { databaseConnection };
