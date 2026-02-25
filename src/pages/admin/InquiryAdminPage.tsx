import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InquiryTable } from "@/components/admin/InquiryTable";
import { InquiryReplyForm } from "@/components/admin/InquiryReplyForm";
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
import type { Inquiry, InquiryReplyPayload } from "@/types/admin-inquiry";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  fetchInquiries,
  updateInquiryReply,
  deleteInquiry,
} from "@/lib/inquiry-api";

export default function InquiryAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyOpen, setReplyOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [replyingInquiry, setReplyingInquiry] = useState<Inquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const loadInquiries = async () => {
    setLoading(true);
    const { data, error } = await fetchInquiries();
    setLoading(false);
    if (error) {
      toast.error("문의사항 목록을 불러오지 못했습니다. " + error.message);
      return;
    }
    setInquiries(data ?? []);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // 상태 필터 적용
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredInquiries(inquiries);
    } else {
      setFilteredInquiries(inquiries.filter((inquiry) => inquiry.status === statusFilter));
    }
  }, [inquiries, statusFilter]);

  const handleReply = (inquiry: Inquiry) => {
    setReplyingInquiry(inquiry);
    setReplyOpen(true);
  };

  const handleReplySubmit = async (payload: InquiryReplyPayload) => {
    if (!replyingInquiry) return;
    setSubmitting(true);
    const { data, error } = await updateInquiryReply(replyingInquiry.id, payload);
    setSubmitting(false);
    if (error) {
      toast.error("답변 저장에 실패했습니다. " + error.message);
      return;
    }
    setInquiries((prev) => prev.map((i) => (i.id === replyingInquiry.id && data ? data : i)));
    toast.success("답변이 저장되었습니다.");
    setReplyOpen(false);
    setReplyingInquiry(null);
  };

  const handleDeleteClick = (inquiry: Inquiry) => setDeleteTarget(inquiry);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const { error } = await deleteInquiry(deleteTarget.id);
    if (error) {
      toast.error("삭제에 실패했습니다. " + error.message);
      return;
    }
    setInquiries((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    toast.success("문의사항이 삭제되었습니다.");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">문의사항 관리</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="접수">접수</SelectItem>
            <SelectItem value="답변완료">답변완료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <InquiryTable inquiries={filteredInquiries} onReply={handleReply} onDelete={handleDeleteClick} />
      )}

      <InquiryReplyForm
        open={replyOpen}
        onOpenChange={setReplyOpen}
        inquiry={replyingInquiry}
        onSubmit={handleReplySubmit}
        submitting={submitting}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>문의사항 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.name}"님의 문의사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
