import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { LoginUserCommand } from './login-user.command';
import { LoginUserController } from './login-user.controller';
import { LoginUserHandler } from './login-user.handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [CqrsModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '6000s' },
      }),
    }),
  ],
  controllers: [LoginUserController],
  providers: [UserRepository, LoginUserCommand, LoginUserHandler],
})
export class LoginUserModule { }
