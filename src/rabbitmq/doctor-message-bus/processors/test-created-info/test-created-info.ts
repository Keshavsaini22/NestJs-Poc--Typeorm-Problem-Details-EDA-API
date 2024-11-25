import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { InboxMessageDoctorRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message-doctor.repository.';
import { DataSource } from 'typeorm';
import { Message } from '../common/message.interface';

export class TestCreatedInfoProcessor {
  constructor(
    @InjectRepository(InboxMessageDoctorRepository)
    private inboxMessageRepository: InboxMessageDoctorRepository,

    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  getHandlerName(): string {
    return this.constructor.name;
  }

  async handleEvent(payload: Message<any>) {
    await this.dataSource.transaction(async (transaction) => {
      console.log(
        'This is payload of test created in Test module: ',
        payload.body.data,
      );

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
