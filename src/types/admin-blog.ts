export type BlogPostStatus = "draft" | "published";

export const BLOG_CATEGORIES = ["DATA", "AI", "EDU", "POLICY", "INDUSTRY", "ENTERPRISE", "ETC"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  imageDisplay: string;
  author?: string;
  publishedDate?: string;
  createdAt: string;
  status: BlogPostStatus;
}

export interface BlogFormPayload {
  title: string;
  content: string;
  category: string;
  imageFile: File | null;
  author: string;
  publishedDate: string;
  status: BlogPostStatus;
}
