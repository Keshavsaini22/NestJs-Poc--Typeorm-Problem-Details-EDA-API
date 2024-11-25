import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/infrastructure/repositories/patient/patient.repository';
import { CreatePatientDto, UpdatePatientDto } from './patient.dto';
import { DataSource } from 'typeorm';
import { OutboxMessagePatientRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-patient.repository';
import { CreatePatientEvent } from 'src/domain/patient/events/create-patient.event';
import { Patient } from 'src/domain/patient/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    private repository: PatientRepository,
    private dataSource: DataSource,
    private outboxMessageRepository: OutboxMessagePatientRepository,
  ) {}

  public async registerPatient(payload: CreatePatientDto) {
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const patient = await this.repository.savePatient(
          payload,
          transactionalEntityManager,
        );

        await this.outboxMessageRepository.storeOutboxMessage(
          new CreatePatientEvent({ patient }),
          transactionalEntityManager,
        );

        return patient;
      },
    );
  }

  public async updatePatient(uuid: string, payload: UpdatePatientDto) {
    // return await this.dataSource.transaction(
    //   async (transactionalEntityManager) => {
    //     const response = await this.repository.updatePatient(
    //       uuid,
    //       payload,
    //       transactionalEntityManager,
    //     );
    //     return response;
    //   },
    // );

    const transaction1 = async () => {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        console.log('Transaction 1: Starting');
        const patient = await transactionalEntityManager
          .createQueryBuilder(Patient, 'patient')
          .setLock('pessimistic_write')
          .where('patient.uuid = :uuid', {
            uuid: '5ed1967a-8bbb-46a8-8722-4a016bf56376',
          })
          .getOne();

        console.log('patient 1: ', patient);
        console.log('Transaction 1: Lock acquired');
        await new Promise((resolve) => setTimeout(resolve, 7000)); // Simulate processing delay
        console.log('Transaction 1: Completed');
      });
    };

    // Simulate the second transaction
    const transaction2 = async () => {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        console.log('Transaction 2: Starting');
        const patient = await transactionalEntityManager
          .createQueryBuilder(Patient, 'patient')
          .setLock('pessimistic_write')
          .where('patient.uuid = :uuid', {
            uuid: '5ed1967a-8bbb-46a8-8722-4a016bf56376',
          })
          .getOne();

        console.log('patient2: ', patient);
        console.log('Transaction 2: Lock acquired');
      });
    };

    // Run both transactions concurrently
    await Promise.all([transaction1(), transaction2()]);
  }
}
