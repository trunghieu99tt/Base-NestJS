import * as dotenv from 'dotenv';

dotenv.config();

// get env
export const getEnv = (key: string) => {
  const value = process.env[key];
  return value || '';
};

// server
export const ENVIRONMENT = getEnv('NODE_ENV');
export const PRODUCTION = ENVIRONMENT === 'production';
export const DEVELOPMENT = ENVIRONMENT === 'development';

export const PORT = getEnv('PORT');

// project
export const PROJECT_NAME = getEnv('PROJECT_NAME');
export const PROJECT_VERSION = getEnv('PROJECT_VERSION');

// Cloudinary
export const CLOUDINARY_URL = getEnv('CLOUDINARY_URL');
export const CLOUDINARY_PATH = getEnv('CLOUDINARY_PATH');
export const CLOUDINARY_PATH_DEV = getEnv('CLOUDINARY_PATH_DEV');

// MongoDB
export const DB_HOST = getEnv('DB_HOST');
export const DB_PORT = getEnv('DB_PORT')
  ? parseInt(getEnv('DB_PORT'), 10)
  : undefined;
export const DB_NAME = getEnv('DB_NAME');
export const DB_USER = getEnv('DB_USER');
export const DB_PASS = getEnv('DB_PASS');
export const DB_CHARSET = getEnv('DB_CHARSET');

// swagger
export const SWAGGER_PATH = getEnv('SWAGGER_PATH');

// Auth
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_ACCESS_TOKEN_EXP_IN_SEC = getEnv('JWT_ACCESS_TOKEN_EXP_IN_SEC')
  ? parseInt(getEnv('JWT_ACCESS_TOKEN_EXP_IN_SEC'))
  : undefined;
export const JWT_REFRESH_TOKEN_EXP_IN_SEC = getEnv(
  'JWT_REFRESH_TOKEN_EXP_IN_SEC',
)
  ? parseInt(getEnv('JWT_REFRESH_TOKEN_EXP_IN_SEC'))
  : undefined;
export const DEFAULT_API_KEY = getEnv('DEFAULT_API_KEY');
export const DEFAULT_ADMIN_USER_PASSWORD = getEnv(
  'DEFAULT_ADMIN_USER_PASSWORD',
);
export const DEFAULT_ADMIN_USER_USERNAME = getEnv(
  'DEFAULT_ADMIN_USER_USERNAME',
);
