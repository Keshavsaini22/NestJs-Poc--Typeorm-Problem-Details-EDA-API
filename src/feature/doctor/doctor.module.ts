import { DoctorRepository } from 'src/infrastructure/repositories/doctor/doctor.repository';
import { DoctorService } from './doctor.service';
import { DoctorsController } from './doctor.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorService, DoctorRepository],
})
export class DoctorModule {}
