import { registerAs } from '@nestjs/config';

export const serverConfig = () => ({
  port: parseInt(process.env.PORT, 10),
  jwtSecret: process.env.JWT_SECRET,
  firebaseApiKey: process.env.FIREBASE_API_KEY,
  runtimeUrl: process.env.RUNTIME_URL,
  runtimeDomain: process.env.RUNTIME_DOMAIN,
});

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
}));

export const oauthConfig = registerAs('oauth', () => ({
  githubId: process.env.OAUTH_GITHUB_ID,
  githubSecret: process.env.OAUTH_GITHUB_SECRET,
}));
