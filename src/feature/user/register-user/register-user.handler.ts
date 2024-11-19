import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async execute(command: RegisterUserCommand) {
    const user = await this.repository.saveUser(command);
    console.log('user: ', user);
    return user;
  }
}
