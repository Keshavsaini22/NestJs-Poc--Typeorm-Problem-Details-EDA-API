import { Injectable } from '@nestjs/common';
import { PatientRepository } from 'src/infrastructure/repositories/patient/patient.repository';
import { CreatePatientDto } from './patient.dto';
import { DataSource } from 'typeorm';
import { OutboxMessagePatientRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-patient.repository';
import { CreatePatientEvent } from 'src/domain/patient/events/create-patient.event';

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
}
