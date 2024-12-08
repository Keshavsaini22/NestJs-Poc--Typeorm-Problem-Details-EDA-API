import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RegisterUserCommand } from './register-user.command';
import { RegisterUserDto } from './register-user.dto';

@Controller('users')
export class RegisterUserController {
  constructor(private commandBus: CommandBus) { }

  @UseInterceptors(FilesInterceptor('files', 10, {
    dest: './uploads',
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  }))
  @Post('/')
  async registerUser(@Body() registerUserDto: RegisterUserDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('files: ', files)

    const { name, email, address, role, password } = registerUserDto;

    const command = new RegisterUserCommand(name, email, address, role, password);

    return this.commandBus.execute(command);
  }
}
