import { useState } from "react";
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const inquiryTypes = ["데이터 분석", "AI 솔루션", "플랫폼 서비스", "교육", "기타"];

const faqs = [
  { q: "WiseIN은 어떤 산업 분야에 서비스를 제공하나요?", a: "공공기관, 지자체, 금융, 제조, 교육, 스타트업 등 다양한 산업 분야에 데이터 분석, AI 솔루션, 플랫폼 서비스, 교육 프로그램을 제공하고 있습니다." },
  { q: "프로젝트 문의부터 착수까지 얼마나 걸리나요?", a: "프로젝트 규모와 복잡도에 따라 다르지만, 일반적으로 문의 후 1~2주 내에 초기 미팅과 제안서를 제공하며, 합의 후 2~4주 내에 착수합니다." },
  { q: "공공기관 보안 기준을 충족하나요?", a: "네, WiseIN의 모든 시스템과 플랫폼은 행정안전부 보안 기준을 충족하며, ISMS 인증 등 관련 보안 인증을 취득·유지하고 있습니다." },
  { q: "교육 프로그램은 기업 맞춤형으로 제공되나요?", a: "네, 기업의 산업 특성, 임직원 수준, 교육 목표에 맞춰 맞춤형 커리큘럼을 설계하여 제공합니다. 정부지원 교육과정도 운영하고 있습니다." },
  { q: "Richway 플랫폼 도입 비용은 어떻게 되나요?", a: "플랫폼 도입 비용은 사용 규모와 커스터마이징 범위에 따라 달라집니다. 자세한 내용은 문의 폼을 통해 상담을 요청해주시면 맞춤 견적을 안내드립니다." },
];

const notices = [
  { id: "1", title: "2025년 상반기 정부지원 교육과정 수강생 모집", date: "2025.01.15", category: "교육" },
  { id: "2", title: "연말 시스템 점검 안내 (12/28~12/30)", date: "2024.12.20", category: "공지" },
  { id: "3", title: "WiseIN 채용 안내 – 데이터 분석가, AI 엔지니어", date: "2024.12.10", category: "채용" },
];

const Support = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-blue-highlight text-sm font-medium tracking-widest uppercase mb-4 font-display">Support</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">고객 지원</h1>
          <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">문의, FAQ, 공지사항을 통해 필요한 정보를 빠르게 확인하세요.</p>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Contact Us</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">문의하기</h2>

          {submitted ? (
            <div className="bg-section-bg border border-border rounded-lg p-8 text-center">
              <Send className="w-10 h-10 text-blue-highlight mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">문의가 접수되었습니다</h3>
              <p className="text-sm text-muted-foreground">담당자가 확인 후 빠르게 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">이름 *</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">이메일 *</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="example@company.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">전화번호</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">문의 유형 *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">선택해주세요</option>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">문의 내용 *</label>
                <textarea
                  required rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="프로젝트 또는 서비스에 대해 자유롭게 문의해주세요."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-navy-light transition-colors"
              >
                문의 보내기 <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-section-bg">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">자주 묻는 질문</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6 overflow-hidden">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Notices */}
      <section id="notice" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Notice</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">공지사항</h2>
          <div className="space-y-3">
            {notices.map((notice) => (
              <div key={notice.id} className="border border-border rounded-lg p-6 hover:border-blue-highlight/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{notice.category}</span>
                  <span className="text-xs text-muted-foreground">{notice.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-primary">{notice.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
