import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/domain/doctor/doctor.entity';
import { DoctorRepository } from 'src/infrastructure/repositories/doctor/doctor.repository';
import { ListDoctorDto } from './doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private repository: DoctorRepository) {}

  public async registerDoctor(payload) {
    return this.repository.saveDoctor(payload);
  }

  public async listDoctors(payload:ListDoctorDto) {
    return this.repository.listDoctors(payload);
  }
}
