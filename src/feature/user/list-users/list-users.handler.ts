import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from './list-users.query';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async execute(query: ListUsersQuery) {
    const a = await this.repository.search(query);
    return a;
  }
}
