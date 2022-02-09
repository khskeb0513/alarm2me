import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  FIREBASE_API_KEY: string;

  @IsString()
  RUNTIME_URL: string;

  @IsString()
  RUNTIME_DOMAIN: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  OAUTH_GITHUB_ID: string;

  @IsString()
  OAUTH_GITHUB_SECRET: string;

  @IsString()
  SWAGGER_USERNAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
