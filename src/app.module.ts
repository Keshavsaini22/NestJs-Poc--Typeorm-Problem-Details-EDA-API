import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { RegisterUserModule } from './feature/user/register-user/register-user.module';
import { ListUsersModule } from './feature/user/list-users/list-users.module';
import { DoctorModule } from './feature/doctor/doctor.module';
import { PatientModule } from './feature/patient/patient.module';
import { TestModule } from './feature/test/test.module';

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
    DoctorModule,
    PatientModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
