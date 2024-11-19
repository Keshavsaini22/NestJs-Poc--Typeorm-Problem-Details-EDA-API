import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { RegisterUserCommand } from 'src/feature/user/register-user/register-user.command';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async saveUser(payload: UserType): Promise<User> {
    return await this.save(payload);
  }
}
