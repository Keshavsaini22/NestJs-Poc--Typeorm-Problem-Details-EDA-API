import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, ListDoctorDto } from './doctor.dto';
import { Response } from 'express';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorService) {}

  @Post('/')
  async registerDoctor(@Body() body: CreateDoctorDto) {
    return await this.service.registerDoctor(body);
  }

  @Get('/')
  async getDoctors(@Res() response: Response, @Query() query: ListDoctorDto) {
    const res = await this.service.listDoctors(query);
    if (res && !res.total) {
      return response.status(HttpStatus.NO_CONTENT).send();
    }

    return response.status(HttpStatus.OK).send(res);
  }
}
