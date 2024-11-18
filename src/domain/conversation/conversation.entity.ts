import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participant } from '../participant/participant.entity';
import { Message } from '../message/message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToMany(() => Participant, (participant) => participant.conversation, {
    eager: true,
  })
  participants: Participant[];

  @OneToMany(() => Message, (message) => message.conversation, {
    eager: true,
  })
  messages: Message[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at: Date;
}
