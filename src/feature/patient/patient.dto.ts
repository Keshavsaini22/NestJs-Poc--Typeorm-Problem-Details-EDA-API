import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @MaxLength(100)
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name can only contain alphabets' })
  @Transform(({ value }) => value?.replace(/\s+/g, ' ').trim())
  name: string;

  @IsEmail({ ignore_max_length: true })
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(250)
  address: string;

  @IsBoolean()
  @IsOptional()
  insurance?: boolean;

  @IsUUID()
  doctor_uuid: string;
}
