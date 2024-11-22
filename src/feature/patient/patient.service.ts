import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/infrastructure/repositories/patient/patient.repository';
import { CreatePatientDto } from './patient.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    private repository: PatientRepository,
    private dataSource: DataSource,
  ) {}

  public async registerPatient(payload: CreatePatientDto) {
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const patient = await this.repository.savePatient(
          payload,
          transactionalEntityManager,
        );

        return patient;
      },
    );
  }
}
