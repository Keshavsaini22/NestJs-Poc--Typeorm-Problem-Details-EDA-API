import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RabbitmqConfigurerService } from './rabbitmq/config/rabbitmq-configurer.service';
import { RabbitmqConnectionService } from './rabbitmq/config/rabbitmq-connection.service';
import { ProducerService } from './rabbitmq/workers/producer.service';
import { OutboxMessageDoctorRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message-doctor.repository.';

@Injectable()
export class OutboxMessageRelay {
  constructor(
    private readonly rabbitmqConfigurerService: RabbitmqConfigurerService,
    private readonly rabbitmqConnectionService: RabbitmqConnectionService,
    private readonly producerService: ProducerService,
    @InjectRepository(OutboxMessageDoctorRepository)
    private outboxMessageRepository: OutboxMessageDoctorRepository,
  ) {}

  async handleMessage(limit: number) {
    try {
      await this.rabbitmqConnectionService.connect();
      await this.rabbitmqConfigurerService.configure();
      const messages =
        await this.outboxMessageRepository.getUnsentMessages(limit);
      if (!messages.total) {
        console.log('INFO: No messages pending to dispatch.');
        return;
      }

      await this.producerService.publishMessages(messages.data);
      console.log(`INFO: Published ${messages.total} messages)`);
    } catch (error) {
      console.log('Error in publishing messages ', error);
    }
  }
}
