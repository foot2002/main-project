export const NOTICE_CATEGORIES = ["전체공지", "서비스", "회사소식", "기타"] as const;
export type NoticeCategory = (typeof NOTICE_CATEGORIES)[number];

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  date?: string;
  author?: string;
  createdAt: string;
}

export interface NoticeFormPayload {
  title: string;
  content: string;
  category: NoticeCategory;
  date: string;
  author: string;
}
