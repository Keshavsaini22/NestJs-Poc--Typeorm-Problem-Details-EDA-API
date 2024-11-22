import { Injectable } from '@nestjs/common';
import { PatientCreatedInfoDoctorProcessor } from './patient-created-info-doctor/patient-created-info-doctor';

@Injectable()
export class SignatureTypesDoctor {
  constructor(
    private readonly patientCreatedInfo: PatientCreatedInfoDoctorProcessor,
  ) {}
  public signatureTypes: Record<string, any[]> = {
    'hospital.patient.create-patient': [this.patientCreatedInfo],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
