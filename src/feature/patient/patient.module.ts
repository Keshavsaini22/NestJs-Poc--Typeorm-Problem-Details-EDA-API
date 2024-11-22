import { Module } from '@nestjs/common';
import { PatientRepository } from 'src/infrastructure/repositories/patient/patient.repository';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
})
export class PatientModule {}
