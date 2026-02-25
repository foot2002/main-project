import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";

const pressData: Record<string, { title: string; source: string; date: string; summary: string; content: string }> = {
  "1": {
    title: "WiseIN, 2024 공공 데이터 활용 우수사례 선정",
    source: "전자신문", date: "2024.10.20",
    summary: "행정안전부 주관 2024년 공공 데이터 활용 우수사례 공모전에서 WiseIN의 정책 효과 분석 시스템이 최우수상을 수상했다.",
    content: "WiseIN Company(대표 OOO)는 행정안전부가 주관하는 '2024 공공 데이터 활용 우수사례 공모전'에서 최우수상을 수상했다고 20일 밝혔다.\n\nWiseIN이 수상한 프로젝트는 중앙정부 산하 기관의 주요 정책 성과를 데이터 기반으로 측정·평가하는 통합 분석 시스템이다. 이 시스템은 다양한 공공 데이터 소스를 통합하고, 통계 모델링과 시각화 대시보드를 통해 정책 효과를 실시간으로 모니터링할 수 있도록 구현되었다.\n\n심사위원회는 \"데이터 분석의 전문성과 공공 정책에의 기여도가 탁월하다\"며 \"향후 다른 공공기관으로의 확산 가능성이 높다\"고 평가했다.",
  },
  "2": {
    title: "AI 기반 설문 자동화…WiseIN 'SaaS형 리서치' 주목",
    source: "디지털타임스", date: "2024.08.15",
    summary: "WiseIN이 출시한 AI 기반 설문조사 자동화 플랫폼이 공공기관과 기업 시장에서 빠르게 확산되고 있다.",
    content: "데이터 분석 전문기업 WiseIN Company가 AI 기반 설문조사 자동화 SaaS 플랫폼을 출시하며 리서치 시장에서 주목받고 있다.\n\n이 플랫폼은 자연어 처리(NLP) 기술을 활용해 설문 문항을 자동 설계하고, 다채널 배포와 실시간 분석을 지원한다. 특히 자동 보고서 생성 기능은 기존 대비 조사 비용을 60% 이상 절감하고, 분석 소요 시간을 80% 단축하는 것으로 나타났다.\n\nWiseIN 관계자는 \"23년간의 리서치 노하우를 AI 기술과 결합해 누구나 쉽게 전문적인 조사를 수행할 수 있도록 했다\"고 설명했다.",
  },
};

const AboutPressDetail = () => {
  const { id } = useParams();
  const article = id ? pressData[id] : null;

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-muted-foreground mb-4">기사를 찾을 수 없습니다.</p>
          <Link to="/about/press" className="text-blue-highlight text-sm font-semibold hover:underline">언론 보도로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link to="/about/press" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> 언론 보도
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">{article.title}</h1>
          <p className="text-muted-foreground text-sm mb-10">{article.source} · {article.date}</p>

          <div className="bg-section-bg rounded-lg p-6 mb-10">
            <p className="text-sm text-foreground leading-relaxed">{article.summary}</p>
          </div>

          <div className="prose prose-sm max-w-none">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPressDetail;
