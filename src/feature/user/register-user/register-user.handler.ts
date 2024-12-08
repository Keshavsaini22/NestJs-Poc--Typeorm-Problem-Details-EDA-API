import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { RegisterUserCommand } from './register-user.command';
import { UserEmailAlreadyExistsConflict } from 'src/domain/user/exceptions/exceptions';
import * as bcrypt from 'bcrypt';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async execute(command: RegisterUserCommand) {
    const user = await this.repository.findByEmail(command.email);

    if (user) throw new UserEmailAlreadyExistsConflict();

    const hashedPassword = await bcrypt.hash(command.password, 10);

    return await this.repository.saveUser({...command,password:hashedPassword});
  }
}
