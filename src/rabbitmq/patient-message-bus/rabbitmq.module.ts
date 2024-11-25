import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { RabbitmqConfigService } from './rabbitmq/config/rabbit-config.service';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { OutboxMessagePatientRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-patient.repository';
import { OutboxMessagePatient } from 'src/domain/outbox-message-patient/outbox-message-patient.entity';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { HandleMessages } from './cli-commands/handle-messages';
import { ConsumerService } from './rabbitmq/workers/consumer.service';
import { SignatureTypesPatient } from './processors/signature-types.service';
import { InboxMessagePatientRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message-patient.repository';
import { TestCreatedInfoProcessor } from './processors/test-created-info/test-created-info';

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
    DispatchMessages,
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
    OutboxMessagePatientRepository,
    OutboxMessagePatient,
    ProducerService,
    OutboxMessageRelay,
    InboxMessageHandler,
    HandleMessages,
    ConsumerService,
    SignatureTypesPatient,
    InboxMessagePatientRepository,
    TestCreatedInfoProcessor
  ],
})
export class RabbitmqModule {}
