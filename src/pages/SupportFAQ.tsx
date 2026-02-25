import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "WiseIN은 어떤 산업 분야에 서비스를 제공하나요?", a: "공공기관, 지자체, 금융, 제조, 교육, 스타트업 등 다양한 산업 분야에 데이터 분석, AI 솔루션, 플랫폼 서비스, 교육 프로그램을 제공하고 있습니다." },
  { q: "프로젝트 문의부터 착수까지 얼마나 걸리나요?", a: "프로젝트 규모와 복잡도에 따라 다르지만, 일반적으로 문의 후 1~2주 내에 초기 미팅과 제안서를 제공하며, 합의 후 2~4주 내에 착수합니다." },
  { q: "공공기관 보안 기준을 충족하나요?", a: "네, WiseIN의 모든 시스템과 플랫폼은 행정안전부 보안 기준을 충족하며, ISMS 인증 등 관련 보안 인증을 취득·유지하고 있습니다." },
  { q: "교육 프로그램은 기업 맞춤형으로 제공되나요?", a: "네, 기업의 산업 특성, 임직원 수준, 교육 목표에 맞춰 맞춤형 커리큘럼을 설계하여 제공합니다. 정부지원 교육과정도 운영하고 있습니다." },
  { q: "Richway 플랫폼 도입 비용은 어떻게 되나요?", a: "플랫폼 도입 비용은 사용 규모와 커스터마이징 범위에 따라 달라집니다. 자세한 내용은 문의 폼을 통해 상담을 요청해주시면 맞춤 견적을 안내드립니다." },
];

const SupportFAQ = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">FAQ</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-8">자주 묻는 질문</h1>
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
  </Layout>
);

export default SupportFAQ;
