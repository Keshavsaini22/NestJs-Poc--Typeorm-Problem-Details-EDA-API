import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { HandleMessages } from './cli-commands/handle-messages';
import { OutboxMessageTestRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-test.repository';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { InboxMessageTest } from 'src/domain/inbox-message-test/inbox-message-test.entity';
import { InboxMessageTestRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message-test.repository';
import { OutboxMessageTest } from 'src/domain/outbox-message-test/outbox-message-test.entity';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { SignatureTypesTest } from './processor/signature-types.service';
import { GeneralTestProcessor } from './processor/general-test/general-test';
import { ConsumerService } from './rabbitmq/workers/consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [
    HandleMessages,
    DispatchMessages,
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
    OutboxMessageTestRepository,
    InboxMessageTest,
    InboxMessageTestRepository,
    OutboxMessageTest,
    ProducerService,
    OutboxMessageRelay,
    InboxMessageHandler,
    SignatureTypesTest,
    GeneralTestProcessor,
    ConsumerService,
  ],
})
export class RabbitmqModule {}
