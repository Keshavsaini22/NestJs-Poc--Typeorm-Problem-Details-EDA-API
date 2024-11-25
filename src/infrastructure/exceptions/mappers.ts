import { BadRequestException, HttpStatus } from '@nestjs/common';
import {
  ProblemDocument,
  ProblemDocumentExtension,
} from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';
import { UserEmailAlreadyExistsConflict } from 'src/domain/user/exceptions/exceptions';
import { BadRequest, DtoValidation, NotFound } from './exceptions';

class ConflictMapper {
  static mapError(error: Error): ProblemDocument {
    return new ProblemDocument({
      title: 'Conflict',
      detail: error.message,
      status: HttpStatus.CONFLICT,
    });
  }
}

class NotFoundMapper {
  static mapError(error: Error): ProblemDocument {
    return new ProblemDocument({
      title: 'Not Found',
      detail: error.message,
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class UserEmailAlreadyExistsConflictMapper extends ErrorMapper {
  constructor() {
    super(UserEmailAlreadyExistsConflict);
  }

  mapError(error: Error): ProblemDocument {
    return ConflictMapper.mapError(error);
  }
}

//NOT FOUND
export class NotFoundExceptionMapper extends ErrorMapper {
  constructor() {
    super(NotFound);
  }

  mapError(error: Error): ProblemDocument {
    return NotFoundMapper.mapError(error);
  }
}

//Bad Request
export class BadRequestExceptionMapper extends ErrorMapper {
  constructor() {
    super(BadRequest);
  }

  mapError(error: Error): ProblemDocument {
    return new ProblemDocument({
      title: 'Bad Request',
      detail: error.message,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class DtoValidationExceptionMapper extends ErrorMapper {
  constructor() {
    super(DtoValidation);
  }

  mapError(error: Error): ProblemDocument {
    const response =
      error instanceof DtoValidation ? error.getResponse() : null;
    const extension = new ProblemDocumentExtension({
      invalid_params:
        response && typeof response === 'object'
          ? (response as any)?.message
          : null,
    });
    return new ProblemDocument(
      {
        title: 'Bad Request',
        detail: error.message,
        status: HttpStatus.BAD_REQUEST,
      },
      extension,
    );
  }
}

export class ValidationPipeExceptionMapper extends ErrorMapper {
  constructor() {
    super(BadRequestException);
  }

  mapError(error: Error): ProblemDocument {
    return new ProblemDocument({
      title: 'Bad Request',
      detail: error.message,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
