import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import bizEdu from "@/assets/business04_1.jpg";

const outcomes = [
  "데이터 분석 기초·심화 과정",
  "AI/머신러닝 실무 과정",
  "정부지원 국비교육과정",
  "기업 맞춤형 In-house 교육",
  "데이터 리터러시·AI 활용 역량 강화",
  "수준과 목적에 맞는 체계적 커리큘럼",
];

const BusinessEducation = () => (
  <Layout>
    <section className="bg-primary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <Link to="/business" className="inline-flex items-center gap-1 text-blue-highlight text-sm mb-6 hover:underline">
          <ArrowLeft size={14} /> 사업 영역
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-10 h-10 text-blue-highlight" strokeWidth={1.5} />
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">데이터+AI교육</h1>
            <p className="text-xs text-primary-foreground/50 font-display mt-1 tracking-widest uppercase">Data & AI Education</p>
          </div>
        </div>
        <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">
          데이터 리터러시와 AI 활용 역량을 강화하기 위한 체계적인 교육 프로그램을 운영합니다.
        </p>
      </div>
    </section>

    {/* Single section: Image left, Card right */}
    <section className="py-16 lg:py-24 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src={bizEdu} alt="데이터+AI교육" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-3 -left-3 text-7xl font-bold text-blue-highlight/10 font-display leading-none select-none">
              01
            </span>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-10 shadow-lg shadow-primary/5 hover:border-blue-highlight/20 transition-colors">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-3 font-display">
                Data & AI Education
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">전문 교육 프로그램</h2>
              <p className="text-lg font-medium text-foreground/90 mb-6">
                정부지원부터 기업 맞춤형까지, 데이터와 AI 역량을 한 단계 높입니다.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                정부지원 교육과정부터 기업 맞춤형 In-house 교육까지, 다양한 수준과 목적에 맞는 커리큘럼을 제공합니다. 23년간의 실무 경험을 바탕으로 데이터 리터러시와 AI 활용 역량을 체계적으로 강화합니다.
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

export default BusinessEducation;
