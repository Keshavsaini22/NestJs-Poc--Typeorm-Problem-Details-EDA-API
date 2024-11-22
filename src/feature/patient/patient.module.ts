import { Module } from '@nestjs/common';
import { PatientRepository } from 'src/infrastructure/repositories/patient/patient.repository';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { OutboxMessagePatientRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-patient.repository';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PatientRepository,OutboxMessagePatientRepository],
})
export class PatientModule {}
