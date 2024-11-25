import { MapperRegistry } from 'http-problem-details-mapper';
import {
  BadRequestExceptionMapper,
  DtoValidationExceptionMapper,
  NotFoundExceptionMapper,
  UserEmailAlreadyExistsConflictMapper,
  ValidationPipeExceptionMapper,
} from './mappers';

export class MapperRegistryFactory {
  static create(): MapperRegistry {
    return new MapperRegistry({ useDefaultErrorMapper: false })
      .registerMapper(new UserEmailAlreadyExistsConflictMapper())
      .registerMapper(new DtoValidationExceptionMapper())
      .registerMapper(new ValidationPipeExceptionMapper())
      .registerMapper(new NotFoundExceptionMapper())
      .registerMapper(new BadRequestExceptionMapper());
  }
}
