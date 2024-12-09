import { ConfigService } from '@nestjs/config';
import { Seeder } from 'typeorm-extension';
import { dataSource } from '../data-source';
import { User } from 'src/domain/user/user.entity';

export class UserSeeder implements Seeder {
  private readonly configService: ConfigService;
  constructor() {
    this.configService = new ConfigService();
  }

  async run(): Promise<void> {
    const users = [
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        address: '789 Park Ave',
        role: 'user',
        password: 'password',
        created_at: '2022-03-12T07:23:44.000Z',
        updated_at: '2023-11-15T14:21:30.000Z',
        deleted_at: null,
      },
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 Main St',
        role: 'admin',
        password: 'password',
        created_at: '2020-01-20T16:45:23.000Z',
        updated_at: '2023-01-10T11:22:19.000Z',
        deleted_at: '2023-07-18T08:12:45.000Z',
      },
      {
        name: 'Keshav Saini',
        email: 'keshav.smith@example.com',
        address: '789 Park Ave',
        role: 'user',
        password: 'password',
        created_at: '2022-03-12T07:23:44.000Z',
        updated_at: '2023-11-15T14:21:30.000Z',
        deleted_at: null,
      },
    ];

    const repository = dataSource.getRepository(User);
    await repository.insert(users);
  }
}
