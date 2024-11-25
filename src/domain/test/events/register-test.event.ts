import { Event } from 'src/domain/common/event';

export class CreateTestEvent extends Event {
  constructor(payload) {
    super(payload);
    this.type = 'hospital.test.create-test';
  }
  getBody() {
    return {
      data: this.payload,
    };
  }
}
