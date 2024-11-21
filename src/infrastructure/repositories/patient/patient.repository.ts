import { Injectable } from '@nestjs/common';
import { Patient } from 'src/domain/patient/patient.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PatientRepository extends Repository<Patient> {
  constructor(dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }
}
