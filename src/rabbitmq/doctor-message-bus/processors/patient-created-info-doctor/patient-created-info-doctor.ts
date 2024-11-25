import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Message } from '../common/message.interface';
import { InboxMessageDoctorRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message-doctor.repository.';
import { OutboxMessageDoctorRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-doctor.repository.';
import { GeneralTestEvent } from 'src/domain/doctor/events/general-test.event';

export class PatientCreatedInfoDoctorProcessor {
  constructor(
    @InjectRepository(InboxMessageDoctorRepository)
    private inboxMessageRepository: InboxMessageDoctorRepository,

    @InjectDataSource()
    private dataSource: DataSource,

    private outboxMessageRepository: OutboxMessageDoctorRepository,
  ) {}

  getHandlerName(): string {
    return this.constructor.name;
  }

  async handleEvent(payload: Message<any>) {
    await this.dataSource.transaction(async (transaction) => {
      await this.outboxMessageRepository.storeOutboxMessage(
        new GeneralTestEvent({ ...payload.body.data }),
        transaction,
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
