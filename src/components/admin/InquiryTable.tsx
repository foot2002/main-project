import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Mail } from "lucide-react";
import type { Inquiry } from "@/types/admin-inquiry";
import { cn } from "@/lib/utils";

interface InquiryTableProps {
  inquiries: Inquiry[];
  onReply: (inquiry: Inquiry) => void;
  onDelete: (inquiry: Inquiry) => void;
}

const statusLabel = (status: string) => {
  const labels: Record<string, string> = {
    접수: "접수",
    답변완료: "답변완료",
  };
  return labels[status] || status;
};

export function InquiryTable({ inquiries, onReply, onDelete }: InquiryTableProps) {
  if (inquiries.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        접수된 문의사항이 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left font-medium text-foreground px-4 py-3">이름</th>
              <th className="text-left font-medium text-foreground px-4 py-3">이메일</th>
              <th className="text-left font-medium text-foreground px-4 py-3">전화번호</th>
              <th className="text-left font-medium text-foreground px-4 py-3">문의유형</th>
              <th className="text-left font-medium text-foreground px-4 py-3">문의내용</th>
              <th className="text-left font-medium text-foreground px-4 py-3">상태</th>
              <th className="text-left font-medium text-foreground px-4 py-3">접수일</th>
              <th className="text-right font-medium text-foreground px-4 py-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 text-foreground font-medium">{inquiry.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <a href={`mailto:${inquiry.email}`} className="hover:text-blue-highlight">
                    {inquiry.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{inquiry.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{inquiry.inquiryType}</td>
                <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate" title={inquiry.content}>
                  {inquiry.content}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      inquiry.status === "답변완료"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    )}
                  >
                    {statusLabel(inquiry.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onReply(inquiry)}
                      aria-label="답변"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(inquiry)}
                      aria-label="삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
