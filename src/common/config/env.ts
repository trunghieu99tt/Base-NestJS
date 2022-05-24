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
export const MONGO_URL = getEnv('MONGO_URL');
export const MONGO_DB_NAME = getEnv('MONGO_DB_NAME');
export const MONGO_USERNAME = getEnv('MONGO_USERNAME');
export const MONGO_PASSWORD = getEnv('MONGO_PASSWORD');
export const DATABASE_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.g231j.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

// swagger
export const SWAGGER_PATH = getEnv('SWAGGER_PATH');

// Auth
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_EXP = Number(getEnv('JWT_EXP'));

// Google
export const GOOGLE_SECRET = getEnv('GOOGLE_SECRET');
export const GOOGLE_CLIENT_ID = getEnv('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_EMAIL = getEnv('GOOGLE_CLIENT_EMAIL');
export const GOOGLE_PRIVATE_KEY = getEnv('GOOGLE_PRIVATE_KEY');
export const GOOGLE_EMAIL_SERVICE_ACCOUNT_KEY = getEnv(
  'GOOGLE_MAIL_SERVICE_ACCOUNT_KEY',
);
export const GOOGLE_REDIRECT_URI = getEnv('GOOGLE_REDIRECT_URI');
export const GOOGLE_SERVICE_ACCOUNT_ID = getEnv('GOOGLE_SERVICE_ACCOUNT_ID');
export const GOOGLE_MAIL_REFRESH_TOKEN = getEnv('GOOGLE_MAIL_REFRESH_TOKEN');
// Github
export const GITHUB_CLIENT_ID = getEnv('GITHUB_CLIENT_ID');
export const GITHUB_REDIRECT_URL = getEnv('GITHUB_REDIRECT_URL');
export const GITHUB_CLIENT_SECRET = getEnv('GITHUB_CLIENT_SECRET');

// Mailer
export const MAILER_EMAIL_ID = getEnv('MAILER_EMAIL_ID');
export const MAILER_PASSWORD = getEnv('MAILER_PASSWORD');

// Agora
export const AGORA_APP_ID = getEnv('AGORA_APP_ID');
export const AGORA_APP_CERTIFICATE = getEnv('AGORA_APP_CERTIFICATE');
