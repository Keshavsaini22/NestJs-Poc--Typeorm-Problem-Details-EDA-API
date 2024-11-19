import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { ConsumerService } from './rabbitmq/workers/consumer.service';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { HandleMessages } from './cli-commands/handle-messages';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    DispatchMessages,
    HandleMessages,
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelay,
    ConsumerService,
    InboxMessageHandler,
    InboxMessageRepository,
  ],
})
export class RabbitmqModule {}
