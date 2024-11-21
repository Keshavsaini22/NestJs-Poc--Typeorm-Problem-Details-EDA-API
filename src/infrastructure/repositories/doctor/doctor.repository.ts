import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/domain/doctor/doctor.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DoctorRepository extends Repository<Doctor> {
  constructor(dataSource: DataSource) {
    super(Doctor, dataSource.createEntityManager());
  }
}
