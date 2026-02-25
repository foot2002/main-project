import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NoticeTable } from "@/components/admin/NoticeTable";
import { NoticeForm } from "@/components/admin/NoticeForm";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Notice, NoticeFormPayload } from "@/types/admin-notice";
import { NOTICE_CATEGORIES } from "@/types/admin-notice";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  fetchNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "@/lib/notice-api";

export default function NoticeAdminPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const loadNotices = async () => {
    setLoading(true);
    const { data, error } = await fetchNotices();
    setLoading(false);
    if (error) {
      toast.error("공지사항 목록을 불러오지 못했습니다. " + error.message);
      return;
    }
    setNotices(data ?? []);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  // 분류 필터 적용
  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter((notice) => notice.category === categoryFilter));
    }
  }, [notices, categoryFilter]);

  const handleCreateNew = () => {
    setEditingNotice(null);
    setFormOpen(true);
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormOpen(true);
  };

  const handleFormSubmit = async (payload: NoticeFormPayload) => {
    setSubmitting(true);
    if (editingNotice) {
      const { data, error } = await updateNotice(editingNotice.id, payload);
      setSubmitting(false);
      if (error) {
        toast.error("수정에 실패했습니다. " + error.message);
        return;
      }
      setNotices((prev) => prev.map((n) => (n.id === editingNotice.id && data ? data : n)));
      toast.success("공지사항이 수정되었습니다.");
    } else {
      const { data, error } = await createNotice(payload);
      setSubmitting(false);
      if (error) {
        toast.error("등록에 실패했습니다. " + error.message);
        return;
      }
      if (data) setNotices((prev) => [data, ...prev]);
      toast.success("공지사항이 등록되었습니다.");
    }
    setFormOpen(false);
    setEditingNotice(null);
  };

  const handleDeleteClick = (notice: Notice) => setDeleteTarget(notice);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const { error } = await deleteNotice(deleteTarget.id);
    if (error) {
      toast.error("삭제에 실패했습니다. " + error.message);
      return;
    }
    setNotices((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    toast.success("공지사항이 삭제되었습니다.");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">공지사항 관리</h1>
        <Button onClick={handleCreateNew} className="shrink-0" disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Create Notice
        </Button>
      </div>

      {/* 분류 필터 */}
      <div className="flex items-center gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="전체 분류" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 분류</SelectItem>
            {NOTICE_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <NoticeTable notices={filteredNotices} onEdit={handleEdit} onDelete={handleDeleteClick} />
      )}

      <NoticeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editingNotice}
        onSubmit={handleFormSubmit}
        submitting={submitting}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>공지사항 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.title}" 공지사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
