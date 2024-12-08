import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserDto } from './login-user.dto';
import { LoginUserCommand } from './login-user.command';
import { Response } from 'express';

@Controller('users/login')
export class LoginUserController {
    constructor(private commandBus: CommandBus) { }

    @Post('/')
    async registerUser(@Body() registerUserDto: LoginUserDto, @Res() res: Response,) {
        const { email, password } = registerUserDto;

        const command = new LoginUserCommand(email, password);

        const response = await this.commandBus.execute(command);
        return res.status(HttpStatus.OK).json(response);
    }
}
