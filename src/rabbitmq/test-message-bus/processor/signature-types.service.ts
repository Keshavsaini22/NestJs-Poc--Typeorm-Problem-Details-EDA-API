import { Injectable } from '@nestjs/common';
import { GeneralTestProcessor } from './general-test/general-test';

@Injectable()
export class SignatureTypesTest {
  constructor(
    private readonly generalTest: GeneralTestProcessor,
  ) {}
  public signatureTypes: Record<string, any[]> = {
    'hospital.doctor.general-test': [this.generalTest],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
