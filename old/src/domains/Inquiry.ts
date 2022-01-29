export const InquiryType = {
  BUG_REPORT: 'bug_report',
  VIOLATION_REPORT: 'violation_report',
  FEATURE_REQUEST: 'feature_request',
  DEVELOPMENT: 'development',
  OTHERS: 'others',
} as const;
export type InquiryType = typeof InquiryType[keyof typeof InquiryType];

export class Inquiry {
  _id: string;
  type: InquiryType;
  email?: string;
  text: string;
  constructor({ _id, type, email, text }: Inquiry) {
    this._id = _id;
    this.type = type;
    this.email = email;
    this.text = text;
  }
}
