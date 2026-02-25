import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import bizAi1 from "@/assets/business01_1.jpg";
import bizAi2 from "@/assets/business01_2.jpg";

const sections = [
  {
    image: bizAi1,
    number: "01",
    title: "설문조사·리서치 자동화",
    titleEn: "Survey & Research Automation (SaaS)",
    tagline: "설문부터 보고서까지, AI가 한 번에 처리합니다.",
    description: "공공기관과 기업을 위한 AI 기반 설문 설계·배포·분석 자동화 플랫폼입니다. 자연어 처리(NLP), 감성 분석, 통계 모델링을 활용해 리서치 전 과정의 효율을 극대화합니다.",
    outcomes: [
      "AI 설문 설계 자동화",
      "다채널 배포 & 실시간 응답 수집",
      "실시간 분석 대시보드·자동 보고서 생성",
      "조사 비용 60% 절감, 분석 소요 시간 80% 단축",
    ],
  },
  {
    image: bizAi2,
    number: "02",
    title: "AI 마케팅 자동화 솔루션",
    titleEn: "AI Marketing Automation",
    tagline: "고객을 이해하고, 캠페인을 최적화합니다.",
    description: "AI 기반 고객 세그먼테이션, 캠페인 최적화, 성과 예측을 통합 제공하는 마케팅 자동화 솔루션입니다. 머신러닝과 추천 엔진으로 마케팅 ROI를 극대화합니다.",
    outcomes: [
      "고객 행동 예측 모델링",
      "자동 세그먼테이션·캠페인 성과 최적화",
      "ROI 예측 및 분석",
      "마케팅 ROI 40% 향상, 고객 이탈률 25% 감소",
    ],
  },
];

const BusinessAISolutions = () => (
  <Layout>
    <section className="bg-primary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/business" className="inline-flex items-center gap-1 text-blue-highlight text-sm mb-6 hover:underline">
          <ArrowLeft size={14} /> 사업 영역
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-10 h-10 text-blue-highlight" strokeWidth={1.5} />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">AI 솔루션</h1>
            <p className="text-xs text-primary-foreground/50 font-display mt-1 tracking-widest uppercase">AI Solutions</p>
          </div>
        </div>
        <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">
          설문조사 자동화 SaaS, AI 마케팅 자동화 등 AI 기반 혁신 솔루션을 제공합니다.
        </p>
      </div>
    </section>

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
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-3 font-display">{sections[0].titleEn}</p>
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

    <section className="py-16 lg:py-24 border-b border-border bg-section-bg/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10 shadow-lg shadow-primary/5 hover:border-blue-highlight/20 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-3 font-display">{sections[1].titleEn}</p>
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

export default BusinessAISolutions;
