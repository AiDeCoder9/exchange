export default () => ({
  port: process.env.PORT || 3000,
  applicationURL: process.env.APPLICATION_URL,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expiry: process.env.TOKEN_EXPIRY,
  },
  mail: {
    key: process.env.MAIL_API_KEY,
    sender: process.env.MAIL_SENDER,
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiry: process.env.REFRESH_TOKEN_EXPIRY,
  },
});
