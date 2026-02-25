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
import type { Press, PressFormPayload } from "@/types/admin-press";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface PressFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Press | null;
  onSubmit: (payload: PressFormPayload) => void;
  submitting?: boolean;
}

const emptyPayload: PressFormPayload = {
  title: "",
  source: "",
  linkUrl: "",
  date: "",
  isPinned: false,
  displayOrder: 0,
  isVisible: true,
};

export function PressForm({ open, onOpenChange, initialData, onSubmit, submitting = false }: PressFormProps) {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [date, setDate] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(initialData?.id);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setTitle(initialData.title);
        setSource(initialData.source);
        setLinkUrl(initialData.linkUrl);
        setDate(initialData.date ? initialData.date.slice(0, 10) : "");
        setIsPinned(initialData.isPinned);
        setDisplayOrder(initialData.displayOrder);
        setIsVisible(initialData.isVisible);
      } else {
        setTitle(emptyPayload.title);
        setSource(emptyPayload.source);
        setLinkUrl(emptyPayload.linkUrl);
        setDate(emptyPayload.date);
        setIsPinned(emptyPayload.isPinned);
        setDisplayOrder(emptyPayload.displayOrder);
        setIsVisible(emptyPayload.isVisible);
      }
      setErrors({});
    }
  }, [open, initialData]);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "제목을 입력하세요.";
    if (!source.trim()) next.source = "출처를 입력하세요.";
    if (!linkUrl.trim()) next.linkUrl = "링크를 입력하세요.";
    else if (!linkUrl.startsWith("http://") && !linkUrl.startsWith("https://")) {
      next.linkUrl = "링크는 http:// 또는 https://로 시작해야 합니다.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload: PressFormPayload = {
      title: title.trim(),
      source: source.trim(),
      linkUrl: linkUrl.trim(),
      date: date || "",
      isPinned,
      displayOrder: Number(displayOrder) || 0,
      isVisible,
    };
    onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "언론보도 수정" : "언론보도 등록"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="press-title">제목 (필수)</Label>
            <input
              id="press-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                errors.title && "border-destructive"
              )}
              placeholder="기사 제목을 입력하세요"
            />
            {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="press-source">출처 (필수)</Label>
            <input
              id="press-source"
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                errors.source && "border-destructive"
              )}
              placeholder="언론사명 (예: 전자신문, 한국경제)"
            />
            {errors.source && <p className="mt-1 text-xs text-destructive">{errors.source}</p>}
          </div>

          <div>
            <Label htmlFor="press-link-url">링크 URL (필수)</Label>
            <div className="relative">
              <input
                id="press-link-url"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className={cn(
                  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  errors.linkUrl && "border-destructive"
                )}
                placeholder="https://example.com/article"
              />
              {linkUrl && (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            {errors.linkUrl && <p className="mt-1 text-xs text-destructive">{errors.linkUrl}</p>}
            <p className="mt-1 text-xs text-muted-foreground">http:// 또는 https://로 시작하는 유효한 URL을 입력하세요.</p>
          </div>

          <div>
            <Label htmlFor="press-date">날짜 (선택사항)</Label>
            <input
              id="press-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="press-is-pinned" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="press-is-pinned"
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded border-input"
                />
                <span>상단고정</span>
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">체크 시 목록 상단에 고정 표시됩니다.</p>
            </div>

            <div>
              <Label htmlFor="press-display-order">순서 (숫자)</Label>
              <input
                id="press-display-order"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="0"
                min="0"
              />
              <p className="mt-1 text-xs text-muted-foreground">숫자가 작을수록 앞에 표시됩니다. (기본값: 0)</p>
            </div>

            <div>
              <Label htmlFor="press-is-visible" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="press-is-visible"
                  type="checkbox"
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  className="rounded border-input"
                />
                <span>노출 여부</span>
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">체크 해제 시 공개 페이지에 표시되지 않습니다.</p>
            </div>
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
