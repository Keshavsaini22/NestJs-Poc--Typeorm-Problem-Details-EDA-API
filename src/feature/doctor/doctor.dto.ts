import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @MaxLength(100)
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name can only contain alphabets' })
  @Transform(({ value }) => value?.replace(/\s+/g, ' ').trim())
  name: string;

  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name can only contain alphabets' })
  @Transform(({ value }) => value?.replace(/\s+/g, ' ').trim())
  specialty: string;
}

export class ListDoctorDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page?: number;
}
