export type PortfolioStatus = "draft" | "published";

export const PORTFOLIO_CATEGORIES = ["PUBLIC", "ENTERPRISE", "EDUCATION", "ETC"] as const;
export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export interface PortfolioItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageDisplay: string;
  author?: string;
  writtenDate?: string;
  createdAt: string;
  status: PortfolioStatus;
}

export interface PortfolioFormPayload {
  title: string;
  content: string;
  category: string;
  imageFile: File | null;
  author: string;
  writtenDate: string;
  status: PortfolioStatus;
}
