import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { mapEnvironmentKeys } from 'src/env/utils';

export class Environment {
  @IsString()
  ENV: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  PORT: number;

  @IsString()
  DB_URI: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  SHOW_DOCS: boolean;

  @IsString()
  AUTH0_ISSUER: string;

  @IsString()
  AUTH0_AUDIENCE: string;
}

export const ENV = mapEnvironmentKeys<Environment>(Environment);
