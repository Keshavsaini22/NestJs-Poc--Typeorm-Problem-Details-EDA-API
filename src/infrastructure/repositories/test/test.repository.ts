import { Injectable } from '@nestjs/common';
import { Doctor } from 'src/domain/doctor/doctor.entity';
import { Patient } from 'src/domain/patient/patient.entity';
import { Test } from 'src/domain/test/test.entity';
import { NotFound } from 'src/infrastructure/exceptions/exceptions';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class TestRepository extends Repository<Test> {
  constructor(dataSource: DataSource) {
    super(Test, dataSource.createEntityManager());
  }

  async saveTest(payload: any, transactionalEntityManager: EntityManager) {

    const doctor = await transactionalEntityManager.findOne(Doctor, {
      where: { uuid: payload.patient.doctor.uuid },
    });
    if (!doctor) {
      throw new NotFound('Doctor not found');
    }

    const patient = await transactionalEntityManager.findOne(Patient, {
      where: { uuid: payload.patient.uuid },
    });
    if (!patient) {
      throw new NotFound('Patient not found');
    }
    
    const test = transactionalEntityManager.create(Test, {
      name: 'General Test',
      result: true,
      doctor,
      patient,
    });

    return transactionalEntityManager.save(test);
  }
}
