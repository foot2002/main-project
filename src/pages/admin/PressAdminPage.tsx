import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PressTable } from "@/components/admin/PressTable";
import { PressForm } from "@/components/admin/PressForm";
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
import type { Press, PressFormPayload } from "@/types/admin-press";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  fetchPressListAdmin,
  createPress,
  updatePress,
  deletePress,
} from "@/lib/press-api";

export default function PressAdminPage() {
  const [pressList, setPressList] = useState<Press[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingPress, setEditingPress] = useState<Press | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Press | null>(null);

  const loadPressList = async () => {
    setLoading(true);
    const { data, error } = await fetchPressListAdmin("default");
    setLoading(false);
    if (error) {
      toast.error("언론보도 목록을 불러오지 못했습니다. " + error.message);
      return;
    }
    setPressList(data ?? []);
  };

  useEffect(() => {
    loadPressList();
  }, []);

  const handleCreateNew = () => {
    setEditingPress(null);
    setFormOpen(true);
  };

  const handleEdit = (press: Press) => {
    setEditingPress(press);
    setFormOpen(true);
  };

  const handleFormSubmit = async (payload: PressFormPayload) => {
    setSubmitting(true);
    if (editingPress) {
      const { data, error } = await updatePress(editingPress.id, payload);
      setSubmitting(false);
      if (error) {
        toast.error("수정에 실패했습니다. " + error.message);
        return;
      }
      setPressList((prev) => prev.map((p) => (p.id === editingPress.id && data ? data : p)));
      toast.success("언론보도가 수정되었습니다.");
    } else {
      const { data, error } = await createPress(payload);
      setSubmitting(false);
      if (error) {
        toast.error("등록에 실패했습니다. " + error.message);
        return;
      }
      if (data) setPressList((prev) => [data, ...prev]);
      toast.success("언론보도가 등록되었습니다.");
    }
    setFormOpen(false);
    setEditingPress(null);
  };

  const handleDeleteClick = (press: Press) => setDeleteTarget(press);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const { error } = await deletePress(deleteTarget.id);
    if (error) {
      toast.error("삭제에 실패했습니다. " + error.message);
      return;
    }
    setPressList((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast.success("언론보도가 삭제되었습니다.");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">언론보도 관리</h1>
        <Button onClick={handleCreateNew} className="shrink-0" disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Create Press
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <PressTable pressList={pressList} onEdit={handleEdit} onDelete={handleDeleteClick} />
      )}

      <PressForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editingPress}
        onSubmit={handleFormSubmit}
        submitting={submitting}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>언론보도 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.title}" 언론보도를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
