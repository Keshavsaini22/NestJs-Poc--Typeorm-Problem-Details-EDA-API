import { Injectable } from '@nestjs/common';
import { TestCreatedInfoProcessor } from './test-created-info/test-created-info';

@Injectable()
export class SignatureTypesPatient {
  constructor(private readonly testCreatedInfo: TestCreatedInfoProcessor) {}
  public signatureTypes: Record<string, any[]> = {
    'hospital.test.create-test': [this.testCreatedInfo],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
