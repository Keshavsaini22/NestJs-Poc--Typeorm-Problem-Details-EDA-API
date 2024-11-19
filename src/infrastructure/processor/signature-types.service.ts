import { Injectable } from '@nestjs/common';

@Injectable()
export class SignatureTypes {
  constructor(
    // private readonly notifyApplicantAboutScholarshipApplicationRequest: NotifyApplicantAboutScholarshipApplicationRequest,
    // private readonly notifyApplicantAboutScholarshipApplicationSummary: NotifyApplicantAboutScholarshipApplicationSummary,
  ) {}
  public signatureTypes: Record<string, any[]> = {
    'sales.scholarship-application-requests.scholarship_application_requested':
      [
        // this.notifyApplicantAboutScholarshipApplicationRequest,
      ],
    'sales.scholarship-application-requests.scholarship_application_finished': [
      // this.notifyApplicantAboutScholarshipApplicationSummary,
    ],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
