export const INQUIRY_TYPES = ["의뢰문의", "제휴문의", "교육문의", "구축문의", "기타"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export type InquiryStatus = "접수" | "답변완료";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  organization?: string;
  position?: string;
  phone: string;
  inquiryType: InquiryType;
  content: string;
  reply?: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
  repliedAt?: string;
}

export interface InquiryFormPayload {
  name: string;
  email: string;
  organization: string;
  position: string;
  phone: string;
  inquiryType: InquiryType;
  content: string;
}

export interface InquiryReplyPayload {
  reply: string;
  status: InquiryStatus;
}
