import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Message } from '../common/message.interface';
import { InboxMessageTestRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message-test.repository';
import { OutboxMessageTestRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-test.repository';

export class GeneralTestProcessor {
  constructor(
    @InjectRepository(InboxMessageTestRepository)
    private inboxMessageRepository: InboxMessageTestRepository,

    @InjectDataSource()
    private dataSource: DataSource,

    private outboxMessageRepository: OutboxMessageTestRepository,
  ) {}

  getHandlerName(): string {
    return this.constructor.name;
  }

  async handleEvent(payload: Message<any>) {
    await this.dataSource.transaction(async (transaction) => {
      console.log('payload in GeneralTestProcessor: ', payload.body.data);

      await this.inboxMessageRepository.storeInboxMessage(
        {
          message_id: payload.messageId,
          handler_name: this.getHandlerName(),
        },
        transaction,
      );
    });
  }
}
