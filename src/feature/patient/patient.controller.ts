import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/')
  async registerPatient(@Body() body: CreatePatientDto) {
    return this.patientService.registerPatient(body);
  }

  @Put('/:uuid')
  async updatePatient(
    @Param('uuid') uuid: string,
    @Body() body: UpdatePatientDto,
  ) {
    return this.patientService.updatePatient(uuid, body); 
  }
}
