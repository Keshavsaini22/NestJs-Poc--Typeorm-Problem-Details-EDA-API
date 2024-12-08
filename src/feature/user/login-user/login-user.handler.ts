import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequest } from 'src/infrastructure/exceptions/exceptions';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { LoginUserCommand } from './login-user.command';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler
    implements ICommandHandler<LoginUserCommand> {
    constructor(
        @InjectRepository(UserRepository)
        private readonly repository: UserRepository,

        private jwtService: JwtService

    ) { }

    async execute(command: LoginUserCommand) {
        const user = await this.repository.findByEmail(command.email);
        if (!user) throw new BadRequest('Trying to login with wrong email.');

        const isPasswordValid = await user.validatePassword(command.password);

        if (!isPasswordValid) {
            throw new BadRequest('Your password is wrong.');
        }

        const payload = { sub: user.uuid, email: user.email };

        return {
            token: await this.jwtService.signAsync(payload),
            email: user.email,
            username: user.name,
            role: user.role,
            address: user.address,
            uuid: user.uuid,
        };
    }
}
