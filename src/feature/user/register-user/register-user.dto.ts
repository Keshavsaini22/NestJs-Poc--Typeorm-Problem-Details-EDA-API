import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/domain/user/enums/roles.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;
}

