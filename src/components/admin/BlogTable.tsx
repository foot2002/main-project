import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { BlogPost } from "@/types/admin-blog";
import { cn } from "@/lib/utils";

interface BlogTableProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
}

const statusLabel = (status: string) => (status === "published" ? "Published" : "Draft");

export function BlogTable({ posts, onEdit, onDelete }: BlogTableProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        등록된 글이 없습니다.
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
              <th className="text-left font-medium text-foreground px-4 py-3">Published Date</th>
              <th className="text-left font-medium text-foreground px-4 py-3">Created At</th>
              <th className="text-left font-medium text-foreground px-4 py-3">Status</th>
              <th className="text-right font-medium text-foreground px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 text-foreground font-medium max-w-[200px] truncate" title={post.title}>
                  {post.title}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{post.author ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString("ko-KR") : "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      post.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {statusLabel(post.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEdit(post)}
                      aria-label="편집"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(post)}
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
