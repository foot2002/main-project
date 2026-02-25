import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import type { Press } from "@/types/admin-press";
import { cn } from "@/lib/utils";

interface PressTableProps {
  pressList: Press[];
  onEdit: (press: Press) => void;
  onDelete: (press: Press) => void;
}

export function PressTable({ pressList, onEdit, onDelete }: PressTableProps) {
  if (pressList.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        등록된 언론보도가 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left font-medium text-foreground px-4 py-3">제목</th>
              <th className="text-left font-medium text-foreground px-4 py-3">출처</th>
              <th className="text-left font-medium text-foreground px-4 py-3">고정/순서</th>
              <th className="text-left font-medium text-foreground px-4 py-3">노출</th>
              <th className="text-left font-medium text-foreground px-4 py-3">링크</th>
              <th className="text-left font-medium text-foreground px-4 py-3">날짜</th>
              <th className="text-right font-medium text-foreground px-4 py-3">작업</th>
            </tr>
          </thead>
          <tbody>
            {pressList.map((press) => (
              <tr
                key={press.id}
                className={cn(
                  "border-b border-border last:border-0 hover:bg-muted/30",
                  !press.isVisible && "opacity-50"
                )}
              >
                <td className="px-4 py-3 text-foreground font-medium max-w-[200px] truncate" title={press.title}>
                  <div className="flex items-center gap-2">
                    {press.isPinned && (
                      <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-800 px-2 py-0.5 text-xs font-medium">
                        TOP
                      </span>
                    )}
                    <span>{press.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{press.source}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {press.isPinned ? "고정" : "—"} / {press.displayOrder}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      press.isVisible
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {press.isVisible ? "노출" : "숨김"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={press.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-highlight hover:text-blue-highlight/80 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3" />
                    링크 열기
                  </a>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {press.date ? new Date(press.date).toLocaleDateString("ko-KR") : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(press)}
                      aria-label="편집"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(press)}
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
