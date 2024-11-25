import { Injectable } from '@nestjs/common';
import { CreateTestEvent } from 'src/domain/test/events/register-test.event';
import { OutboxMessageTestRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-test.repository';
import { TestRepository } from 'src/infrastructure/repositories/test/test.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    private repository: TestRepository,
    private outboxMessageRepository: OutboxMessageTestRepository,
  ) {}

  async registerTest(payload: any, transactionalEntityManager: EntityManager) {
    const test = await this.repository.saveTest(
      payload,
      transactionalEntityManager,
    );

    await this.outboxMessageRepository.storeOutboxMessage(
      new CreateTestEvent({ test }),
      transactionalEntityManager,
    );

    return test;
  }
}
