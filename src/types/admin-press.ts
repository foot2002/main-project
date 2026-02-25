export type PressSortType = "default" | "latest" | "created" | "manual";

export interface Press {
  id: string;
  title: string;
  source: string;
  linkUrl: string;
  date?: string;
  createdAt: string;
  isPinned: boolean;
  displayOrder: number;
  isVisible: boolean;
}

export interface PressFormPayload {
  title: string;
  source: string;
  linkUrl: string;
  date: string;
  isPinned: boolean;
  displayOrder: number;
  isVisible: boolean;
}
