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
import type { Inquiry, InquiryReplyPayload } from "@/types/admin-inquiry";
import { cn } from "@/lib/utils";

interface InquiryReplyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiry: Inquiry | null;
  onSubmit: (payload: InquiryReplyPayload) => void;
  submitting?: boolean;
}

export function InquiryReplyForm({ open, onOpenChange, inquiry, onSubmit, submitting = false }: InquiryReplyFormProps) {
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState<InquiryReplyPayload["status"]>("접수");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && inquiry) {
      setReply(inquiry.reply ?? "");
      setStatus(inquiry.status);
      setErrors({});
    }
  }, [open, inquiry]);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (status === "답변완료" && !reply.trim()) {
      next.reply = "답변을 입력하세요.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload: InquiryReplyPayload = {
      reply: reply.trim(),
      status,
    };
    onSubmit(payload);
    onOpenChange(false);
  };

  if (!inquiry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>문의사항 답변</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 문의 정보 */}
          <div className="space-y-3 p-4 bg-muted/50 rounded-md">
            <div>
              <Label className="text-xs text-muted-foreground">이름</Label>
              <p className="text-sm font-medium">{inquiry.name}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">이메일</Label>
              <p className="text-sm font-medium">{inquiry.email}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">전화번호</Label>
              <p className="text-sm font-medium">{inquiry.phone}</p>
            </div>
            {inquiry.organization && (
              <div>
                <Label className="text-xs text-muted-foreground">소속</Label>
                <p className="text-sm font-medium">{inquiry.organization}</p>
              </div>
            )}
            <div>
              <Label className="text-xs text-muted-foreground">문의유형</Label>
              <p className="text-sm font-medium">{inquiry.inquiryType}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">문의내용</Label>
              <p className="text-sm whitespace-pre-line">{inquiry.content}</p>
            </div>
          </div>

          {/* 답변 입력 */}
          <div>
            <Label htmlFor="inquiry-reply">답변</Label>
            <textarea
              id="inquiry-reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={6}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y",
                errors.reply && "border-destructive"
              )}
              placeholder="답변 내용을 입력하세요"
            />
            {errors.reply && <p className="mt-1 text-xs text-destructive">{errors.reply}</p>}
          </div>

          {/* 상태 선택 */}
          <div>
            <Label>상태</Label>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === "접수"}
                  onChange={() => setStatus("접수")}
                  className="rounded-full border-input"
                />
                <span className="text-sm">접수</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === "답변완료"}
                  onChange={() => setStatus("답변완료")}
                  className="rounded-full border-input"
                />
                <span className="text-sm">답변완료</span>
              </label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "저장 중…" : "저장"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
