import { Injectable } from '@nestjs/common';
import { InboxMessageDoctor } from 'src/domain/inbox-message-doctor/inbox-message-doctor.entity';
import { InboxMessagePayload } from 'src/rabbitmq/doctor-message-bus/rabbitmq/rabbitmq.interface';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class InboxMessageDoctorRepository extends Repository<InboxMessageDoctor> {
  constructor(dataSource: DataSource) {
    super(InboxMessageDoctor, dataSource.createEntityManager());
  }

  async storeInboxMessage(
    payload: InboxMessagePayload,
    transaction: EntityManager = null,
  ) {
    if (transaction) {
      return await transaction.save(InboxMessageDoctor, payload);
    }
    return await this.save(payload);
  }

  async getInboxMessageExists(message_id: string, handler_name: string) {
    const criteria = { message_id, handler_name };
    return this.findOne({ where: criteria });
  }
}
