import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioTable } from "@/components/admin/PortfolioTable";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
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
import type { PortfolioItem, PortfolioFormPayload } from "@/types/admin-portfolio";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  fetchPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "@/lib/portfolio-api";

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);

  const loadItems = async () => {
    setLoading(true);
    const { data, error } = await fetchPortfolioItems();
    setLoading(false);
    if (error) {
      toast.error("포트폴리오 목록을 불러오지 못했습니다. " + error.message);
      return;
    }
    setItems(data ?? []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleFormSubmit = async (payload: PortfolioFormPayload) => {
    setSubmitting(true);
    if (editingItem) {
      const { data, error } = await updatePortfolioItem(
        editingItem.id,
        payload,
        editingItem.imageDisplay
      );
      setSubmitting(false);
      if (error) {
        toast.error("수정에 실패했습니다. " + error.message);
        return;
      }
      setItems((prev) => prev.map((item) => (item.id === editingItem.id && data ? data : item)));
      toast.success("포트폴리오가 수정되었습니다.");
    } else {
      const { data, error } = await createPortfolioItem(payload);
      setSubmitting(false);
      if (error) {
        toast.error("등록에 실패했습니다. " + error.message);
        return;
      }
      if (data) setItems((prev) => [data, ...prev]);
      toast.success("포트폴리오가 등록되었습니다.");
    }
    setFormOpen(false);
    setEditingItem(null);
  };

  const handleDeleteClick = (item: PortfolioItem) => setDeleteTarget(item);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const { error } = await deletePortfolioItem(deleteTarget.id);
    if (error) {
      toast.error("삭제에 실패했습니다. " + error.message);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    toast.success("포트폴리오가 삭제되었습니다.");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">Portfolio Management</h1>
        <Button onClick={handleCreateNew} className="shrink-0" disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Portfolio
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <PortfolioTable items={items} onEdit={handleEdit} onDelete={handleDeleteClick} />
      )}

      <PortfolioForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editingItem}
        onSubmit={handleFormSubmit}
        submitting={submitting}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete portfolio?</AlertDialogTitle>
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
