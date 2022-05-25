import {
  DB_HOST,
  DB_PORT,
  ENVIRONMENT,
  JWT_ACCESS_TOKEN_EXP_IN_SEC,
  JWT_REFRESH_TOKEN_EXP_IN_SEC,
  JWT_SECRET,
  PORT,
} from './env';

export default (): any => ({
  env: ENVIRONMENT,
  port: PORT,
  database: {
    host: DB_HOST,
    port: DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    charset: process.env.DB_CHARSET,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  },
  jwt: {
    secret: JWT_SECRET,
    accessTokenExpiresInSec: JWT_ACCESS_TOKEN_EXP_IN_SEC,
    refreshTokenExpiresInSec: JWT_REFRESH_TOKEN_EXP_IN_SEC,
  },
  defaultApiKey: process.env.DEFAULT_API_KEY,
  defaultAdminUserPassword: process.env.DEFAULT_ADMIN_USER_PASSWORD,
  defaultAdminUserUsername: process.env.DEFAULT_ADMIN_USER_USERNAME,
});
