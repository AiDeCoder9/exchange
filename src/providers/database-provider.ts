import { Provider } from '@nestjs/common';
import { connection } from '@/config/database.config';

const DatabaseProvider: Provider = {
  provide: 'DATABASE_CONNECTION',
  useValue: connection,
};

export default DatabaseProvider;
