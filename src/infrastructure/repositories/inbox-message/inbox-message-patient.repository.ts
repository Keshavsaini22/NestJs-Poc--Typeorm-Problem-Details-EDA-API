import { Injectable } from '@nestjs/common';
import { InboxMessagePatient } from 'src/domain/inbox-message-patient/inbox-message-patient.entity';
import { InboxMessagePayload } from 'src/rabbitmq/doctor-message-bus/rabbitmq/rabbitmq.interface';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class InboxMessagePatientRepository extends Repository<InboxMessagePatient> {
  constructor(dataSource: DataSource) {
    super(InboxMessagePatient, dataSource.createEntityManager());
  }

  async storeInboxMessage(
    payload: InboxMessagePayload,
    transaction: EntityManager = null,
  ) {
    if (transaction) {
      return await transaction.save(InboxMessagePatient, payload);
    }
    return await this.save(payload);
  }

  async getInboxMessageExists(message_id: string, handler_name: string) {
    const criteria = { message_id, handler_name };
    return this.findOne({ where: criteria });
  }
}
