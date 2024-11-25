import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/domain/doctor/doctor.entity';
import { Patient } from 'src/domain/patient/patient.entity';
import {
  CreatePatientDto,
  UpdatePatientDto,
} from 'src/feature/patient/patient.dto';
import { BadRequest, NotFound } from 'src/infrastructure/exceptions/exceptions';
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

  async updatePatient(
    uuid: string,
    payload: UpdatePatientDto,
    transactionalEntityManager: EntityManager,
  ) {
    const queryBuilder = transactionalEntityManager
      ? transactionalEntityManager.createQueryBuilder()
      : this.createQueryBuilder();

    console.log(`Attempting to lock row for UUID: ${uuid}`);
    // Lock the row for update
    const patient = await transactionalEntityManager
      .createQueryBuilder(Patient, 'patient')
      .setLock('pessimistic_write')
      .where('patient.uuid = :uuid', { uuid })
      .getOne();
    if (!patient) {
      throw new BadRequest(`Patient with uuid ${uuid} not found`);
    }
    console.log(`Lock acquired for UUID: ${uuid}`);

    const result = await queryBuilder
      .update(Patient)
      .set(payload)
      .where('uuid = :uuid', { uuid })
      .returning('*')
      .execute();

    return result.affected > 0 ? result.raw[0] : null;
  }
}
