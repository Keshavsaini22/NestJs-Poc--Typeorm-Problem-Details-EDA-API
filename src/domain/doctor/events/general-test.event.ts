import { Event } from 'src/domain/common/event';

export class GeneralTestEvent extends Event {
  constructor(payload) {
    super(payload);
    this.type = 'hospital.doctor.general-test';
  }
  getBody() {
    return {
      data: this.payload,
    };
  }
}
