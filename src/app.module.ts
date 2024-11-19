import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { RegisterUserModule } from './feature/user/register-user/register-user.module';
import { ListUsersModule } from './feature/user/list-users/list-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    RegisterUserModule,
    ListUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
