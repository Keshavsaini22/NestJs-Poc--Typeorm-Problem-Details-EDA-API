import { Injectable } from '@nestjs/common';
import { PatientCreatedInfoDoctorProcessor } from './patient-created-info-doctor/patient-created-info-doctor';
import { TestCreatedInfoProcessor } from './test-created-info/test-created-info';

@Injectable()
export class SignatureTypesDoctor {
  constructor(
    private readonly patientCreatedInfo: PatientCreatedInfoDoctorProcessor,
    private readonly testCreatedInfo: TestCreatedInfoProcessor,
  ) {}
  public signatureTypes: Record<string, any[]> = {
    'hospital.patient.create-patient': [this.patientCreatedInfo],
    'hospital.test.create-test': [this.testCreatedInfo],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
