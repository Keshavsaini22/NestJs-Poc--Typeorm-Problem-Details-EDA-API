import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/domain/doctor/doctor.entity';
import { Patient } from 'src/domain/patient/patient.entity';
import { CreatePatientDto } from 'src/feature/patient/patient.dto';
import { NotFound } from 'src/infrastructure/exceptions/exceptions';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class PatientRepository extends Repository<Patient> {
  constructor(dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }

  async savePatient(
    payload: CreatePatientDto,
    transactionalEntityManager: EntityManager,
  ) {
    const doctor = await transactionalEntityManager.findOne(Doctor, {
      where: { uuid: payload.doctor_uuid },
    });
    if (!doctor) {
      throw new NotFound('Doctor not found');
    }
    const patient = transactionalEntityManager.create(Patient, {
      ...payload,
      doctor,
    });
    return transactionalEntityManager.save(patient);
  }
}
