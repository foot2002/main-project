import { useState } from "react";
import Layout from "@/components/Layout";
import { Send, Loader2 } from "lucide-react";
import { createInquiry } from "@/lib/inquiry-api";
import { INQUIRY_TYPES, type InquiryType } from "@/types/admin-inquiry";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SupportContact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", organization: "", position: "", type: "", message: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      organization: formData.organization.trim() || "",
      position: formData.position.trim() || "",
      phone: formData.phone.trim(),
      inquiryType: formData.type as InquiryType,
      content: formData.message.trim(),
    };

    const { data, error } = await createInquiry(payload);
    setSubmitting(false);

    if (error) {
      toast.error("문의 접수에 실패했습니다. " + error.message);
      return;
    }

    // 성공 시 모달 열기
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    // 폼 리셋
    setFormData({
      name: "", email: "", phone: "", organization: "", position: "", type: "", message: "",
    });
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Contact Us</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-8">문의하기</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">이름 *</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass} placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">이메일 *</label>
                  <input
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass} placeholder="example@company.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">소속</label>
                  <input
                    type="text" value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className={inputClass} placeholder="회사/기관명"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">직급</label>
                  <input
                    type="text" value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className={inputClass} placeholder="팀장, 과장 등"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">전화번호 *</label>
                  <input
                    type="tel" required value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass} placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">문의 유형 *</label>
                  <select
                    required value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">선택해주세요</option>
                    {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">문의 내용 *</label>
                <textarea
                  required rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="프로젝트 또는 서비스에 대해 자유롭게 문의해주세요."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    접수 중...
                  </>
                ) : (
                  <>
                    문의 보내기 <Send size={14} />
                  </>
                )}
              </button>
            </form>

          {/* 성공 모달 */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <Send className="w-12 h-12 text-blue-highlight" />
                </div>
                <DialogTitle className="text-center text-xl">문의가 접수되었습니다</DialogTitle>
                <DialogDescription className="text-center pt-2 text-base">
                  확인 후 24시간 이내에 연락드리겠습니다.
                  <br />
                  좋은 제안과 의견 항상 감사합니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center">
                <Button onClick={handleModalClose} className="w-full sm:w-auto">
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </Layout>
  );
};

export default SupportContact;
