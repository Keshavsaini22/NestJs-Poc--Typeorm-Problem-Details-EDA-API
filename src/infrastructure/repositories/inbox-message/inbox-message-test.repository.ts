import { Injectable } from '@nestjs/common';
import { InboxMessageTest } from 'src/domain/inbox-message-test/inbox-message-test.entity';
import { InboxMessagePayload } from 'src/rabbitmq/doctor-message-bus/rabbitmq/rabbitmq.interface';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class InboxMessageTestRepository extends Repository<InboxMessageTest> {
  constructor(dataSource: DataSource) {
    super(InboxMessageTest, dataSource.createEntityManager());
  }

  async storeInboxMessage(
    payload: InboxMessagePayload,
    transaction: EntityManager = null,
  ) {
    if (transaction) {
      return await transaction.save(InboxMessageTest, payload);
    }
    return await this.save(payload);
  }

  async getInboxMessageExists(message_id: string, handler_name: string) {
    const criteria = { message_id, handler_name };
    return this.findOne({ where: criteria });
  }
}
