import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Layers, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import bizPlatform from "@/assets/business03_1.jpg";

const outcomes = [
  "통합 데이터 수집 및 관리",
  "실시간 대시보드 & 시각화",
  "맞춤형 리포트 자동 생성",
  "API 기반 시스템 연동",
  "공공기관 보안 기준 충족",
  "비전문가도 쉽게 활용 가능한 UI",
];

const BusinessPlatform = () => (
  <Layout>
    <section className="bg-primary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/business" className="inline-flex items-center gap-1 text-blue-highlight text-sm mb-6 hover:underline">
          <ArrowLeft size={14} /> 사업 영역
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <Layers className="w-10 h-10 text-blue-highlight" strokeWidth={1.5} />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">플랫폼 서비스</h1>
            <p className="text-xs text-primary-foreground/50 font-display mt-1 tracking-widest uppercase">Platform Service — Richway</p>
          </div>
        </div>
        <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">
          Richway 플랫폼을 통한 통합 데이터 서비스와 비즈니스 인사이트를 제공합니다.
        </p>
      </div>
    </section>

    <section className="py-16 lg:py-24 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src={bizPlatform} alt="Richway 플랫폼" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-3 -left-3 text-7xl font-bold text-blue-highlight/10 font-display leading-none select-none">01</span>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10 shadow-lg shadow-primary/5 hover:border-blue-highlight/20 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-3 font-display">Platform Service</p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Richway 플랫폼</h2>
              <p className="text-lg font-medium text-foreground/90 mb-6">
                데이터 수집·분석·시각화를 하나로, 올인원 비즈니스 인텔리전스.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Richway는 데이터 수집·분석·시각화를 통합 제공하는 플랫폼입니다. 23년간의 프로젝트 노하우가 반영된 분석 프레임워크와 사용자 친화적 인터페이스로, 공공기관과 기업이 데이터를 손쉽게 활용할 수 있도록 설계되었습니다.
              </p>
              <ul className="space-y-3">
                {outcomes.map((outcome) => (
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

export default BusinessPlatform;
