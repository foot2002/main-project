import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { BarChart3, Brain, Layers, GraduationCap, ArrowRight } from "lucide-react";
import bizData from "@/assets/biz-data.jpg";
import bizAi from "@/assets/biz-ai.jpg";
import bizPlatform from "@/assets/biz-platform.jpg";
import bizEdu from "@/assets/biz-edu.jpg";

const areas = [
  { icon: BarChart3, image: bizData, title: "데이터 분석", titleEn: "Data Analytics", desc: "공공 데이터 분석, 기업 데이터 전략, 리서치 및 컨설팅을 통해 데이터 기반 의사결정을 지원합니다.", href: "/business/data-analytics" },
  { icon: Brain, image: bizAi, title: "AI 솔루션", titleEn: "AI Solutions", desc: "설문조사 자동화 SaaS, AI 마케팅 자동화 등 AI 기반 혁신 솔루션을 제공합니다.", href: "/business/ai-solutions" },
  { icon: Layers, image: bizPlatform, title: "플랫폼 서비스", titleEn: "Platform Service", desc: "Richway 플랫폼을 통한 통합 데이터 서비스와 비즈니스 인사이트를 제공합니다.", href: "/business/platform" },
  { icon: GraduationCap, image: bizEdu, title: "데이터+AI교육", titleEn: "Data & AI Education", desc: "데이터 & AI 역량 강화를 위한 전문 교육 프로그램과 정부지원과정을 운영합니다.", href: "/business/education" },
];

const Business = () => (
  <Layout>
    <section className="bg-primary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-blue-highlight text-sm font-medium tracking-widest uppercase mb-4 font-display">Business Areas</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">사업 영역</h1>
        <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">
          WiseIN은 데이터 분석, AI 솔루션, 플랫폼 서비스, 데이터+AI교육까지 — 데이터와 AI 전 영역에 걸쳐 고객의 전략적 파트너로서 가치를 창출합니다.
        </p>
      </div>
    </section>

    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {areas.map((area) => (
            <Link
              key={area.title}
              to={area.href}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:border-blue-highlight/30 hover:shadow-lg hover:shadow-blue-highlight/5 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img src={area.image} alt={area.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h2 className="text-xl font-bold text-primary mb-1">{area.title}</h2>
                <p className="text-xs text-muted-foreground mb-3 font-display">{area.titleEn}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{area.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-highlight group-hover:gap-2 transition-all">
                  자세히 보기 <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
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

export default Business;
