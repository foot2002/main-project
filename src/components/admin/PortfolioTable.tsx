import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { PortfolioItem } from "@/types/admin-portfolio";
import { cn } from "@/lib/utils";

interface PortfolioTableProps {
  items: PortfolioItem[];
  onEdit: (item: PortfolioItem) => void;
  onDelete: (item: PortfolioItem) => void;
}

const statusLabel = (status: string) => (status === "published" ? "Published" : "Draft");

export function PortfolioTable({ items, onEdit, onDelete }: PortfolioTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        등록된 포트폴리오가 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left font-medium text-foreground px-4 py-3">Title</th>
              <th className="text-left font-medium text-foreground px-4 py-3">Category</th>
              <th className="text-left font-medium text-foreground px-4 py-3">Author</th>
              <th className="text-left font-medium text-foreground px-4 py-3">Written Date</th>
              <th className="text-left font-medium text-foreground px-4 py-3">Created At</th>
              <th className="text-left font-medium text-foreground px-4 py-3">Status</th>
              <th className="text-right font-medium text-foreground px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 text-foreground font-medium max-w-[200px] truncate" title={item.title}>
                  {item.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{item.author ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {item.writtenDate ? new Date(item.writtenDate).toLocaleDateString("ko-KR") : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString("ko-KR")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      item.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {statusLabel(item.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(item)}
                      aria-label="편집"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(item)}
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
