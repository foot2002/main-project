import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCountUp } from "@/hooks/use-count-up";
import { BarChart3, Brain, GraduationCap, Layers, ArrowRight, Building2, Landmark, Banknote, Factory, BookOpen, Rocket } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import bizData from "@/assets/biz-data.jpg";
import bizAi from "@/assets/biz-ai.jpg";
import bizPlatform from "@/assets/biz-platform.jpg";
import bizEdu from "@/assets/biz-edu.jpg";

/* ─── Hero ─── */
const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-navy-dark/70" />
    </div>

    <div className="container mx-auto px-4 lg:px-8 py-28 md:py-36 lg:py-44 relative z-10">
      <div className="max-w-3xl">
        <p className="text-blue-highlight-light text-sm font-medium tracking-widest uppercase mb-6 font-display">
          Data & AI Enterprise Since 2007
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 text-balance">
          데이터와 AI로
          <br />
          비즈니스의 세계를 열다
        </h1>
        <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
          23년의 경험과 2,000건 이상의 프로젝트 수행으로,
          공공기관과 기업의 전략적 의사결정을 지원합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/business"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-highlight px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-highlight-light transition-colors"
          >
            서비스 영역
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
          >
            포트폴리오 보기
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Trust Metrics ─── */
const metrics = [
  { label: "Years of Experience", value: 23, suffix: "년+", desc: "업계 경력" },
  { label: "Completed Projects", value: 2000, suffix: "+", desc: "수행 프로젝트" },
  { label: "Clients", value: 1400, suffix: "+", desc: "고객사" },
  { label: "Members", value: 30000, suffix: "+", desc: "회원 수" },
];

const MetricCard = ({ label, value, suffix, desc }: { label: string; value: number; suffix: string; desc: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center group">
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-display">
        {count.toLocaleString()}
        <span className="text-blue-highlight">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-medium text-foreground">{desc}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

const TrustMetrics = () => (
  <section className="py-20 lg:py-24 border-b border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>
    </div>
  </section>
);

/* ─── Company Summary ─── */
const CompanySummary = () => (
  <section className="py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">About WiseIN</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 text-balance">
          공공기관과 기업을 위한<br className="hidden md:inline" /> 데이터 & AI 전략 파트너
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
          WiseIN은 2007년 설립 이래, 데이터 분석과 AI 기술을 통해 공공기관, 금융, 제조, 교육 등 다양한 산업의 의사결정을 지원해왔습니다. 축적된 경험과 기술력을 바탕으로 고객의 비즈니스 성과를 극대화합니다.
        </p>
        <Link
          to="/about/overview"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-highlight hover:underline"
        >
          회사 소개 보기 <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </section>
);

/* ─── Core Business ─── */
const businessCards = [
  { icon: BarChart3, image: bizData, title: "데이터 분석", titleEn: "Data Analytics", desc: "공공 데이터 분석, 기업 데이터 전략, 리서치 및 컨설팅을 통해 데이터 기반 의사결정을 지원합니다.", href: "/business/data-analytics" },
  { icon: Brain, image: bizAi, title: "AI 솔루션", titleEn: "AI Solutions", desc: "설문조사 자동화 SaaS, AI 마케팅 자동화 등 AI 기반 혁신 솔루션을 제공합니다.", href: "/business/ai-solutions" },
  { icon: Layers, image: bizPlatform, title: "플랫폼 서비스", titleEn: "Platform Service", desc: "Richway 플랫폼을 통한 통합 데이터 서비스와 비즈니스 인사이트를 제공합니다.", href: "/business/platform" },
  { icon: GraduationCap, image: bizEdu, title: "데이터+AI교육", titleEn: "Data & AI Education", desc: "데이터 & AI 역량 강화를 위한 전문 교육 프로그램과 정부지원과정을 운영합니다.", href: "/business/education" },
];

const CoreBusiness = () => (
  <section className="py-20 lg:py-28 bg-section-bg">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-14">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Business Areas</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-balance">핵심 사업 영역</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessCards.map((card) => (
          <Link
            key={card.title}
            to={card.href}
            className="group bg-card rounded-lg border border-border overflow-hidden hover:border-blue-highlight/30 hover:shadow-lg hover:shadow-blue-highlight/5 transition-all duration-300"
          >
            <div className="h-36 overflow-hidden">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-1">{card.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 font-display">{card.titleEn}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-highlight opacity-0 group-hover:opacity-100 transition-opacity">
                자세히 보기 <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Clients ─── */
const clientCategories = [
  { icon: Landmark, label: "공공기관", labelEn: "Public Institutions" },
  { icon: Building2, label: "지자체", labelEn: "Local Governments" },
  { icon: Banknote, label: "금융", labelEn: "Finance" },
  { icon: Factory, label: "제조·산업", labelEn: "Manufacturing" },
  { icon: BookOpen, label: "교육", labelEn: "Education" },
  { icon: Rocket, label: "스타트업", labelEn: "Startups" },
];

const Clients = () => (
  <section className="py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-14">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Our Clients</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-balance">다양한 산업의 신뢰받는 파트너</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {clientCategories.map((cat) => (
          <div
            key={cat.label}
            className="flex flex-col items-center justify-center p-6 rounded-lg border border-border bg-card hover:border-blue-highlight/30 transition-colors text-center"
          >
            <cat.icon className="w-8 h-8 text-blue-highlight mb-3" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-primary">{cat.label}</p>
            <p className="text-[10px] text-muted-foreground mt-1 font-display">{cat.labelEn}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Final CTA ─── */
const FinalCTA = () => (
  <section className="py-20 lg:py-28 bg-primary">
    <div className="container mx-auto px-4 lg:px-8 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 text-balance">
        데이터와 AI가 중요할 때,
        <br />
        WiseIN이 답합니다.
      </h2>
      <p className="text-primary-foreground/60 mb-10 text-sm max-w-md mx-auto">
        23년의 전문성과 2,000건 이상의 실적이 증명합니다.
      </p>
      <Link
        to="/portfolio"
        className="inline-flex items-center gap-2 rounded-md bg-blue-highlight px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-highlight-light transition-colors"
      >
        포트폴리오 보기 <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

/* ─── Page ─── */
const Index = () => (
  <Layout>
    <Hero />
    <TrustMetrics />
    <CompanySummary />
    <CoreBusiness />
    <Clients />
    <FinalCTA />
  </Layout>
);

export default Index;
