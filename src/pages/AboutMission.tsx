import Layout from "@/components/Layout";
import visionMissionImage from "@/assets/vision_mission.jpg";

const AboutMission = () => (
  <Layout>
    <section className="relative w-full aspect-[21/9] min-h-[240px] lg:min-h-[320px] overflow-hidden">
      <img src={visionMissionImage} alt="WiseIN 미션과 비전" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/40" />
    </section>

    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Mission & Vision</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-10">미션 & 비전</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-lg p-10">
            <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-3 font-display">Mission</p>
            <h3 className="text-2xl font-bold text-primary mb-4">미션</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              데이터와 AI 기술을 통해 고객의 의사결정 역량을 강화하고, 데이터 기반 사회 혁신에 기여합니다.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-10">
            <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-3 font-display">Vision</p>
            <h3 className="text-2xl font-bold text-primary mb-4">비전</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              아시아를 대표하는 Data & AI 전문 기업으로 성장하며, 모든 조직이 데이터를 통해 더 나은 결정을 내릴 수 있는 세상을 만들어갑니다.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold text-primary mb-6">핵심 가치</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "신뢰", titleEn: "Trust", desc: "23년간 축적된 경험과 실적으로 증명되는 신뢰를 가장 중요한 가치로 삼습니다." },
              { title: "혁신", titleEn: "Innovation", desc: "최신 데이터 분석 기법과 AI 기술을 끊임없이 연구하고 적용합니다." },
              { title: "파트너십", titleEn: "Partnership", desc: "고객의 비즈니스를 깊이 이해하고 함께 성장하는 전략적 파트너가 됩니다." },
            ].map((v) => (
              <div key={v.title} className="border border-border rounded-lg p-6">
                <h4 className="text-lg font-semibold text-primary mb-1">{v.title}</h4>
                <p className="text-xs text-muted-foreground mb-3 font-display">{v.titleEn}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutMission;
