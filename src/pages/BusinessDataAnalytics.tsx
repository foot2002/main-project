import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { BarChart3, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import bizData1 from "@/assets/business02_1.jpg";
import bizData2 from "@/assets/business02_2.jpg";
import bizData3 from "@/assets/business02_3.jpg";

const sections = [
  {
    image: bizData1,
    number: "01",
    title: "공공 데이터 분석",
    titleEn: "Public Data Analysis",
    tagline: "정책의 근거를 데이터로 설계합니다.",
    description: "정부 및 공공기관의 정책 수립과 의사결정을 위한 체계적 데이터 분석을 제공합니다. 정량·정성 데이터 통합 분석으로 근거 기반 정책 인사이트를 도출합니다.",
    outcomes: [
      "정책 효과성 측정 및 개선",
      "예산 배분 최적화",
      "국민 서비스 품질 향상",
    ],
  },
  {
    image: bizData2,
    number: "02",
    title: "기업 데이터 전략",
    titleEn: "Enterprise Data Strategy",
    tagline: "데이터 자산을 경쟁력으로 전환합니다.",
    description: "기업의 데이터 자산을 전략적으로 활용해 경쟁 우위를 확보하는 End-to-End 컨설팅입니다. 현황 진단, 데이터 거버넌스, 분석 체계 구축까지 한 번에 설계합니다.",
    outcomes: [
      "매출 성장 및 신사업 기회 발굴",
      "운영 효율화 및 비용 절감",
      "고객 경험 혁신",
    ],
  },
  {
    image: bizData3,
    number: "03",
    title: "리서치 & 컨설팅",
    titleEn: "Research & Consulting",
    tagline: "데이터로 시장과 고객을 읽습니다.",
    description: "시장 조사, 트렌드 분석, 고객 인사이트 발굴을 위한 데이터 기반 리서치 서비스입니다. 정량·정성 Multi-method 접근으로 심층 인사이트를 제공합니다.",
    outcomes: [
      "시장 기회 및 리스크 파악",
      "전략적 포지셔닝 수립",
      "의사결정 신뢰도 향상",
    ],
  },
];

const BusinessDataAnalytics = () => (
  <Layout>
    {/* Hero */}
    <section className="bg-primary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/business" className="inline-flex items-center gap-1 text-blue-highlight text-sm mb-6 hover:underline">
          <ArrowLeft size={14} /> 사업 영역
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-10 h-10 text-blue-highlight" strokeWidth={1.5} />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">데이터 분석</h1>
            <p className="text-xs text-primary-foreground/50 font-display mt-1 tracking-widest uppercase">Data Analytics</p>
          </div>
        </div>
        <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">
          공공 데이터 분석, 기업 데이터 전략, 리서치 및 컨설팅을 통해 데이터 기반 의사결정을 지원합니다.
        </p>
      </div>
    </section>

    {/* Section 1: Image left, Card right */}
    <section className="py-16 lg:py-24 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src={sections[0].image} alt={sections[0].title} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-3 -left-3 text-7xl font-bold text-blue-highlight/10 font-display leading-none select-none">
              {sections[0].number}
            </span>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10 shadow-lg shadow-primary/5 hover:border-blue-highlight/20 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-3 font-display">
                {sections[0].titleEn}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">{sections[0].title}</h2>
              <p className="text-lg font-medium text-foreground/90 mb-6">{sections[0].tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{sections[0].description}</p>
              <ul className="space-y-3">
                {sections[0].outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-blue-highlight shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2: Image right, Card left */}
    <section className="py-16 lg:py-24 border-b border-border bg-section-bg/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10 shadow-lg shadow-primary/5 hover:border-blue-highlight/20 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-3 font-display">
                {sections[1].titleEn}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">{sections[1].title}</h2>
              <p className="text-lg font-medium text-foreground/90 mb-6">{sections[1].tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{sections[1].description}</p>
              <ul className="space-y-3">
                {sections[1].outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-blue-highlight shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src={sections[1].image} alt={sections[1].title} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-3 -right-3 text-7xl font-bold text-blue-highlight/10 font-display leading-none select-none">
              {sections[1].number}
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* Section 3: Image left, Card right */}
    <section className="py-16 lg:py-24 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src={sections[2].image} alt={sections[2].title} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-3 -left-3 text-7xl font-bold text-blue-highlight/10 font-display leading-none select-none">
              {sections[2].number}
            </span>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10 shadow-lg shadow-primary/5 hover:border-blue-highlight/20 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-3 font-display">
                {sections[2].titleEn}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">{sections[2].title}</h2>
              <p className="text-lg font-medium text-foreground/90 mb-6">{sections[2].tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{sections[2].description}</p>
              <ul className="space-y-3">
                {sections[2].outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-blue-highlight shrink-0 mt-0.5" strokeWidth={2} />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 lg:py-20 bg-primary text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">프로젝트를 함께 시작하세요</h2>
        <p className="text-primary-foreground/60 text-sm mb-8">WiseIN의 전문가 팀이 최적의 솔루션을 제안합니다.</p>
        <Link to="/support" className="inline-flex items-center gap-2 rounded-md bg-blue-highlight px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-highlight-light transition-colors">
          문의하기 <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </Layout>
);

export default BusinessDataAnalytics;
