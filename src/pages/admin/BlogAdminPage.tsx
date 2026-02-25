import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BlogTable } from "@/components/admin/BlogTable";
import { BlogForm } from "@/components/admin/BlogForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { BlogPost, BlogFormPayload } from "@/types/admin-blog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  fetchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/blog-api";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    const { data, error } = await fetchBlogPosts();
    setLoading(false);
    if (error) {
      toast.error("글 목록을 불러오지 못했습니다. " + error.message);
      return;
    }
    setPosts(data ?? []);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreateNew = () => {
    setEditingPost(null);
    setFormOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormOpen(true);
  };

  const handleFormSubmit = async (payload: BlogFormPayload) => {
    setSubmitting(true);
    if (editingPost) {
      const { data, error } = await updateBlogPost(
        editingPost.id,
        payload,
        editingPost.imageDisplay
      );
      setSubmitting(false);
      if (error) {
        toast.error("수정에 실패했습니다. " + error.message);
        return;
      }
      setPosts((prev) => prev.map((p) => (p.id === editingPost.id && data ? data : p)));
      toast.success("글이 수정되었습니다.");
    } else {
      const { data, error } = await createBlogPost(payload);
      setSubmitting(false);
      if (error) {
        toast.error("등록에 실패했습니다. " + error.message);
        return;
      }
      if (data) setPosts((prev) => [data, ...prev]);
      toast.success("글이 등록되었습니다.");
    }
    setFormOpen(false);
    setEditingPost(null);
  };

  const handleDeleteClick = (post: BlogPost) => setDeleteTarget(post);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const { error } = await deleteBlogPost(deleteTarget.id);
    if (error) {
      toast.error("삭제에 실패했습니다. " + error.message);
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success("글이 삭제되었습니다.");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">Blog Management</h1>
        <Button onClick={handleCreateNew} className="shrink-0" disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <BlogTable posts={posts} onEdit={handleEdit} onDelete={handleDeleteClick} />
      )}

      <BlogForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editingPost}
        onSubmit={handleFormSubmit}
        submitting={submitting}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.title}" will be removed. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
