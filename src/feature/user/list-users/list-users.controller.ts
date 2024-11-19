import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ListUsersDto } from './list-users.dto';
import { ListUsersQuery } from './list-users.query';
import { Response } from 'express';

@Controller('users')
export class ListUsersController {
  constructor(private queryBus: QueryBus) {}

  @Get('/')
  async handle(@Res() response: Response, @Query() reqQuery: ListUsersDto) {
    const query = new ListUsersQuery(reqQuery.limit, reqQuery.page);
    const res = await this.queryBus.execute(query);
    
    if (res && !res.total) {
      return response.status(HttpStatus.NO_CONTENT).send();
    }

    return response.status(HttpStatus.OK).send(res);
  }
}
