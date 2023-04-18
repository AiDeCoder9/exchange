interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  autoLoadEntities: boolean;
}

interface MailConfig {
  key: string;
  sender: string;
}
interface TokenConfig {
  expiry: string;
  secret: string;
}

interface RequestInfoData {
  ip: string;
  useragent: string;
}
