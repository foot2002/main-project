import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Notice } from "@/types/admin-notice";

interface NoticeTableProps {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (notice: Notice) => void;
}

export function NoticeTable({ notices, onEdit, onDelete }: NoticeTableProps) {
  if (notices.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        등록된 공지사항이 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left font-medium text-foreground px-4 py-3">분류</th>
              <th className="text-left font-medium text-foreground px-4 py-3">제목</th>
              <th className="text-left font-medium text-foreground px-4 py-3">날짜</th>
              <th className="text-left font-medium text-foreground px-4 py-3">작성자</th>
              <th className="text-left font-medium text-foreground px-4 py-3">등록일</th>
              <th className="text-right font-medium text-foreground px-4 py-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 text-muted-foreground">{notice.category}</td>
                <td className="px-4 py-3 text-foreground font-medium max-w-[200px] truncate" title={notice.title}>
                  {notice.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {notice.date ? new Date(notice.date).toLocaleDateString("ko-KR") : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{notice.author ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(notice)}
                      aria-label="편집"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(notice)}
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
