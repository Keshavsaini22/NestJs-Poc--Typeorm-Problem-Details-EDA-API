import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne({ where: { email } });
  }

  async saveUser(payload: UserPayload): Promise<User> {
    return await this.save(payload);
  }

  async search(payload: ListUserPayload): Promise<ListUserResponse> {
    const { page = 1, limit = 10 } = payload;
    const offset = limit * (page - 1);
    let queryBuilder = this.createQueryBuilder();
    const [data, total] = await queryBuilder
      .offset(offset)
      .limit(limit)
      .orderBy('created_at', 'DESC')
      .getManyAndCount();
    return { data, total, current_page: page, per_page: limit };
  }
}
