import { Module } from '@nestjs/common';
import { TestRepository } from 'src/infrastructure/repositories/test/test.repository';
import { TestService } from './test.service';
import { OutboxMessageTestRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-test.repository';


@Module({
  controllers: [],
  providers: [TestService, TestRepository,OutboxMessageTestRepository],
})
export class TestModule {}
