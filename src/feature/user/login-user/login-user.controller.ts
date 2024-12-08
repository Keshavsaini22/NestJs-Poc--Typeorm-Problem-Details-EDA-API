import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserDto } from './login-user.dto';
import { LoginUserCommand } from './login-user.command';
import { Response } from 'express';

@Controller('users/login')
export class LoginUserController {
    constructor(private commandBus: CommandBus) { }

    @Post('/')
    async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
        const { email, password } = loginUserDto;

        const command = new LoginUserCommand(email, password);

        const response = await this.commandBus.execute(command);

        res.cookie('jwt', response.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return res.status(HttpStatus.OK).json(response);
    }
}
