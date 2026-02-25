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
import { BLOG_CATEGORIES } from "@/types/admin-blog";
import type { BlogPost, BlogFormPayload, BlogPostStatus } from "@/types/admin-blog";
import { cn } from "@/lib/utils";

interface BlogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: BlogPost | null;
  onSubmit: (payload: BlogFormPayload) => void;
  submitting?: boolean;
}

const emptyPayload: BlogFormPayload = {
  title: "",
  content: "",
  category: "",
  imageFile: null,
  author: "",
  publishedDate: "",
  status: "draft",
};

export function BlogForm({ open, onOpenChange, initialData, onSubmit, submitting = false }: BlogFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDisplay, setImageDisplay] = useState<string>("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [status, setStatus] = useState<BlogPostStatus>("draft");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(initialData?.id);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setTitle(initialData.title);
        setContent(initialData.content);
        setCategory(initialData.category);
        setImageFile(null);
        setImageDisplay(initialData.imageDisplay);
        setAuthor(initialData.author ?? "");
        setPublishedDate(initialData.publishedDate ? initialData.publishedDate.slice(0, 10) : "");
        setStatus(initialData.status);
      } else {
        setTitle(emptyPayload.title);
        setContent(emptyPayload.content);
        setCategory(emptyPayload.category);
        setImageFile(null);
        setImageDisplay("");
        setAuthor(emptyPayload.author);
        setPublishedDate(emptyPayload.publishedDate);
        setStatus(emptyPayload.status);
      }
      setErrors({});
    }
  }, [open, initialData]);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "제목을 입력하세요.";
    if (!content.trim()) next.content = "내용을 입력하세요.";
    if (!category) next.category = "카테고리를 선택하세요.";
    if (!isEdit && !imageFile) next.image = "이미지를 선택하세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageDisplay(file.name);
    } else {
      setImageFile(null);
      setImageDisplay(initialData?.imageDisplay ?? "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload: BlogFormPayload = {
      title: title.trim(),
      content: content.trim(),
      category,
      imageFile: imageFile ?? null,
      author: author.trim(),
      publishedDate: publishedDate || "",
      status,
    };
    onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Post" : "Create New Post"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="blog-title">Title (required)</Label>
            <input
              id="blog-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                errors.title && "border-destructive"
              )}
              placeholder="Post title"
            />
            {errors.title && <p className="mt-1 text-xs text-destructive">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="blog-content">Content (required)</Label>
            <textarea
              id="blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y",
                errors.content && "border-destructive"
              )}
              placeholder="Post content"
            />
            {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content}</p>}
          </div>

          <div>
            <Label htmlFor="blog-category">Category (required)</Label>
            <select
              id="blog-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={cn(
                "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                errors.category && "border-destructive"
              )}
            >
              <option value="">Select category</option>
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
          </div>

          <div>
            <Label htmlFor="blog-image">Image {isEdit ? "(optional, leave empty to keep current)" : "(required)"}</Label>
            <input
              id="blog-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={cn(
                "mt-1 w-full text-sm text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground file:cursor-pointer",
                errors.image && "border-destructive"
              )}
            />
            {imageDisplay && <p className="mt-1 text-xs text-muted-foreground">Selected: {imageDisplay}</p>}
            {errors.image && <p className="mt-1 text-xs text-destructive">{errors.image}</p>}
          </div>

          <div>
            <Label htmlFor="blog-author">Author (optional)</Label>
            <input
              id="blog-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Author name"
            />
          </div>

          <div>
            <Label htmlFor="blog-published-date">Published Date (optional)</Label>
            <input
              id="blog-published-date"
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div>
            <Label>Status</Label>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === "draft"}
                  onChange={() => setStatus("draft")}
                  className="rounded-full border-input"
                />
                <span className="text-sm">Draft</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={status === "published"}
                  onChange={() => setStatus("published")}
                  className="rounded-full border-input"
                />
                <span className="text-sm">Published</span>
              </label>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>{submitting ? "저장 중…" : isEdit ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
