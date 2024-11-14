import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

require('dotenv').config();

export const dataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: ['dist/src/domain/**/*.entity.js'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/infrastructure/database/migrations/*.js'],
  //   seedTableName: 'seeds',
  //   seedName: 'seeder',
  //   seeds: ['dist/src/infrastructure/database/seeders/*.js'],
  //   seedTracking: true,
});
