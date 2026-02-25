import Layout from "@/components/Layout";

const Terms = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Terms of Service</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-10">이용약관</h1>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제1조 (목적)</h2>
            <p>
              본 약관은 WiseIN Company(이하 "회사")가 제공하는 데이터 분석, AI 솔루션, 플랫폼(Richway 등), 교육 서비스 및 웹사이트(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제2조 (정의)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>"서비스"</strong>란 회사가 제공하는 데이터 분석 컨설팅, AI 모델링, SaaS 플랫폼, 데이터/AI 교육 프로그램 등 일체의 서비스를 말합니다.</li>
              <li><strong>"이용자"</strong>란 회사의 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 고객을 말합니다.</li>
              <li><strong>"프로젝트"</strong>란 이용자와 회사 간 별도 계약을 통해 수행되는 데이터 분석, AI 솔루션 구축 등의 업무를 말합니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제3조 (약관의 효력 및 변경)</h2>
            <ul className="list-decimal pl-5 space-y-1">
              <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
              <li>회사는 관련 법률을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 7일 전 공지합니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제4조 (서비스의 제공)</h2>
            <p className="mb-2">회사는 다음의 서비스를 제공합니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>데이터 분석 컨설팅 및 리서치 서비스</li>
              <li>AI/머신러닝 모델 개발 및 솔루션 구축</li>
              <li>SaaS형 리서치·데이터 플랫폼 서비스(Richway 등)</li>
              <li>데이터 리터러시 및 AI 실무 교육 프로그램</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제5조 (이용자의 의무)</h2>
            <ul className="list-decimal pl-5 space-y-1">
              <li>이용자는 서비스 이용 시 관련 법령 및 본 약관의 규정을 준수하여야 합니다.</li>
              <li>이용자는 회사의 서비스를 통해 취득한 데이터, 분석 결과, AI 모델 등을 회사의 사전 동의 없이 제3자에게 제공하거나 상업적으로 활용할 수 없습니다.</li>
              <li>이용자는 서비스 이용을 위해 등록한 정보의 정확성을 유지하여야 합니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제6조 (지식재산권)</h2>
            <p>
              회사가 제공하는 서비스에 포함된 분석 방법론, AI 알고리즘, 플랫폼 소프트웨어, 교육 자료 등의 지식재산권은 회사에 귀속됩니다. 단, 프로젝트 계약에서 별도로 정한 경우 해당 계약을 따릅니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제7조 (비밀유지)</h2>
            <p>
              회사와 이용자는 서비스 이용 과정에서 취득한 상대방의 비밀 정보를 제3자에게 누설하거나 본래 목적 외에 사용하여서는 안 됩니다. 이는 프로젝트 수행 중 공유되는 데이터, 분석 결과, 사업 정보 등을 포함합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제8조 (책임의 제한)</h2>
            <ul className="list-decimal pl-5 space-y-1">
              <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
              <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</li>
              <li>데이터 분석 결과 및 AI 모델의 예측은 참고 자료로서의 성격을 가지며, 이를 근거로 한 의사결정의 결과에 대해 회사는 보증하지 않습니다.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제9조 (분쟁 해결)</h2>
            <p>
              본 약관과 관련하여 분쟁이 발생한 경우 회사의 본사 소재지를 관할하는 법원을 전속적 관할 법원으로 합니다.
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground/60">본 약관은 2025년 1월 1일부터 시행됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Terms;
