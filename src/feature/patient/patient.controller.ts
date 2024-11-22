import { Body, Controller, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/')
  async registerPatient(@Body() body: CreatePatientDto) {
    return this.patientService.registerPatient(body);
  }
}
