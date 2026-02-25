import Layout from "@/components/Layout";

const history = [
  { year: "2007", event: "WiseIN Company 설립" },
  { year: "2010", event: "공공 데이터 분석 사업 본격 진출" },
  { year: "2013", event: "리서치 자동화 플랫폼 1.0 출시" },
  { year: "2015", event: "누적 프로젝트 500건 달성" },
  { year: "2017", event: "AI 솔루션 사업부 신설" },
  { year: "2019", event: "Richway 플랫폼 정식 런칭" },
  { year: "2021", event: "누적 프로젝트 1,500건, 회원 20,000명 돌파" },
  { year: "2023", event: "AI 마케팅 자동화 솔루션 출시" },
  { year: "2024", event: "누적 프로젝트 2,000건, 고객사 1,400+ 달성" },
];

const AboutHistory = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">History</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-10">연혁</h1>
        <div className="space-y-0">
          {history.map((item, i) => (
            <div key={item.year} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-highlight shrink-0 mt-1" />
                {i < history.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-8">
                <p className="text-sm font-bold text-blue-highlight font-display">{item.year}</p>
                <p className="text-sm text-muted-foreground">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutHistory;
