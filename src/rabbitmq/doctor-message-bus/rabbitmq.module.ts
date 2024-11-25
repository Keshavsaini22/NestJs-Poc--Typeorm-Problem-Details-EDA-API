import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'ormconfig';
import { HandleMessages } from './cli-commands/handle-messages';
import { RabbitmqConfigService } from './rabbitmq/config/rabbitmq-config.service';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { ConsumerService } from './rabbitmq/workers/consumer.service';
import { InboxMessageHandler } from './inbox-message-handler.service';
import { InboxMessageDoctorRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message-doctor.repository.';
import { PatientCreatedInfoDoctorProcessor } from './processors/patient-created-info-doctor/patient-created-info-doctor';
import { SignatureTypesDoctor } from './processors/signature-types.service';
import { OutboxMessageDoctorRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-doctor.repository.';
import { DispatchMessages } from './cli-commands/dispatch-messages';
import { OutboxMessageRelay } from './outbox-message-relay.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { OutboxMessageDoctor } from 'src/domain/outbox-message-doctor/outbox-message-doctor.entity';
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
    RabbitmqConfigService,
    RabbitmqConfigurerService,
    RabbitmqConnectionService,
    HandleMessages,
    ConsumerService,
    InboxMessageHandler,
    InboxMessageDoctorRepository,
    PatientCreatedInfoDoctorProcessor,
    SignatureTypesDoctor,
    OutboxMessageDoctorRepository,
    DispatchMessages,
    OutboxMessageRelay,
    ProducerService,
    OutboxMessageDoctor,
    TestCreatedInfoProcessor
  ],
})
export class RabbitmqModule {}
