import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { RegisterUserDto } from './register-user.dto';

@Controller('users')
export class RegisterUserController {
  constructor(private commandBus: CommandBus) {}

  @Post('/')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const { name, email, address, role } = registerUserDto;

    console.log("yoyo")
    const command = new RegisterUserCommand(name, email, address, role);

    console.log("yoyo1")
    return this.commandBus.execute(command);
  }
}
