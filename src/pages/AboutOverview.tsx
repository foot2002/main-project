import Layout from "@/components/Layout";
import companyImage from "@/assets/company.jpg";

const AboutOverview = () => (
  <Layout>
    <section className="relative w-full aspect-[21/9] min-h-[240px] lg:min-h-[320px] overflow-hidden">
      <img src={companyImage} alt="WiseIN 회사 소개" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/40" />
    </section>

    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Company Overview</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6">데이터와 AI로 비즈니스의 미래를 설계합니다</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          WiseIN Company는 2007년 설립 이래, 공공기관과 기업을 대상으로 데이터 분석, AI 솔루션, 플랫폼 서비스, 교육 등 데이터와 AI 전 영역의 서비스를 제공해왔습니다.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          2,000건 이상의 프로젝트 수행 경험과 1,400여 고객사의 신뢰를 바탕으로, 데이터 기반 전략적 의사결정의 파트너로 자리매김하고 있습니다. 30,000명 이상의 회원 커뮤니티를 통해 데이터와 AI 생태계를 확장하고 있습니다.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { value: "23년+", label: "업계 경력" },
            { value: "2,000+", label: "수행 프로젝트" },
            { value: "1,400+", label: "고객사" },
            { value: "30,000+", label: "회원 수" },
          ].map((m) => (
            <div key={m.label} className="text-center border border-border rounded-lg p-6">
              <p className="text-2xl font-bold text-blue-highlight font-display">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutOverview;
