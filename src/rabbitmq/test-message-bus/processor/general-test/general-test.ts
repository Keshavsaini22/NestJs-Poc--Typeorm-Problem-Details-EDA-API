import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Message } from '../common/message.interface';
import { InboxMessageTestRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message-test.repository';
import { OutboxMessageTestRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-test.repository';
import { TestService } from 'src/feature/test/test.service';

export class GeneralTestProcessor {
  constructor(
    @InjectRepository(InboxMessageTestRepository)
    private inboxMessageRepository: InboxMessageTestRepository,

    @InjectDataSource()
    private dataSource: DataSource,

    private outboxMessageRepository: OutboxMessageTestRepository,

    private testHandler: TestService,
  ) {}

  getHandlerName(): string {
    return this.constructor.name;
  }

  async handleEvent(payload: Message<any>) {
    await this.dataSource.transaction(async (transaction) => {
      await this.testHandler.registerTest(payload.body.data, transaction);

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
