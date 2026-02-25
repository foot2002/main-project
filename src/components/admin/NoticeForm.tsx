import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NOTICE_CATEGORIES } from "@/types/admin-notice";
import type { Notice, NoticeFormPayload } from "@/types/admin-notice";
import { cn } from "@/lib/utils";

interface NoticeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Notice | null;
  onSubmit: (payload: NoticeFormPayload) => void;
  submitting?: boolean;
}

const emptyPayload: NoticeFormPayload = {
  title: "",
  content: "",
  category: "전체공지",
  date: "",
  author: "",
};

export function NoticeForm({ open, onOpenChange, initialData, onSubmit, submitting = false }: NoticeFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoticeFormPayload["category"]>("전체공지");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(initialData?.id);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setTitle(initialData.title);
        setContent(initialData.content);
        setCategory(initialData.category);
        setDate(initialData.date ? initialData.date.slice(0, 10) : "");
        setAuthor(initialData.author ?? "");
      } else {
        setTitle(emptyPayload.title);
        setContent(emptyPayload.content);
        setCategory(emptyPayload.category);
        setDate(emptyPayload.date);
        setAuthor(emptyPayload.author);
      }
      setErrors({});
    }
  }, [open, initialData]);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "제목을 입력하세요.";
    if (!content.trim()) next.content = "내용을 입력하세요.";
    if (!category) next.category = "분류를 선택하세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload: NoticeFormPayload = {
      title: title.trim(),
      content: content.trim(),
      category,
      date: date || "",
      author: author.trim(),
    };
    onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "공지사항 수정" : "공지사항 등록"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="notice-category">분류 (필수)</Label>
            <select
              id="notice-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as NoticeFormPayload["category"])}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                errors.category && "border-destructive"
              )}
            >
              {NOTICE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
          </div>

          <div>
            <Label htmlFor="notice-title">제목 (필수)</Label>
            <input
              id="notice-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                errors.title && "border-destructive"
              )}
              placeholder="공지사항 제목을 입력하세요"
            />
            {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="notice-content">내용 (필수)</Label>
            <textarea
              id="notice-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y",
                errors.content && "border-destructive"
              )}
              placeholder="공지사항 내용을 입력하세요"
            />
            {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content}</p>}
          </div>

          <div>
            <Label htmlFor="notice-date">날짜 (선택사항)</Label>
            <input
              id="notice-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div>
            <Label htmlFor="notice-author">작성자 (선택사항)</Label>
            <input
              id="notice-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="작성자 이름"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "저장 중…" : isEdit ? "수정" : "등록"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
