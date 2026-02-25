import Layout from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Privacy Policy</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-10">개인정보처리방침</h1>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제1조 (목적)</h2>
            <p>
              WiseIN Company(이하 "회사")는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제2조 (수집하는 개인정보 항목)</h2>
            <p className="mb-2">회사는 다음의 개인정보 항목을 수집하고 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>문의하기:</strong> 이름, 이메일, 전화번호, 소속, 직급, 문의 내용</li>
              <li><strong>교육 신청:</strong> 이름, 이메일, 전화번호, 소속, 직급, 교육 과정 정보</li>
              <li><strong>플랫폼 서비스 이용:</strong> 아이디, 비밀번호, 이메일, 소속, 서비스 이용 기록, 접속 로그</li>
              <li><strong>자동 수집 항목:</strong> IP 주소, 쿠키, 서비스 이용 기록, 방문 일시</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제3조 (개인정보의 수집 및 이용 목적)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>데이터 분석, AI 솔루션, 플랫폼 서비스 제공 및 계약 이행</li>
              <li>교육 프로그램 운영 및 수강생 관리</li>
              <li>고객 문의 처리 및 상담 서비스 제공</li>
              <li>프로젝트 제안서 작성 및 견적 안내</li>
              <li>서비스 개선을 위한 통계 분석 및 마케팅 활용</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제4조 (개인정보의 보유 및 이용 기간)</h2>
            <p>
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 의하여 보존할 필요가 있는 경우에는 해당 기간 동안 보존합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>계약 또는 청약 철회 등에 관한 기록: 5년</li>
              <li>대금 결제 및 재화 등의 공급에 관한 기록: 5년</li>
              <li>소비자 불만 또는 분쟁 처리에 관한 기록: 3년</li>
              <li>웹사이트 방문 기록: 3개월</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제5조 (개인정보의 제3자 제공)</h2>
            <p>
              회사는 정보주체의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 법률에 특별한 규정이 있거나, 수사 목적으로 법령에 정해진 절차에 따른 요청이 있는 경우에는 예외로 합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제6조 (개인정보의 안전성 확보 조치)</h2>
            <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>개인정보 접근 권한 관리 및 접근 통제</li>
              <li>개인정보의 암호화 처리</li>
              <li>해킹 등에 대비한 보안 프로그램 설치 및 운영</li>
              <li>개인정보 취급 직원의 교육 실시</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제7조 (정보주체의 권리·의무)</h2>
            <p>
              정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있으며, 회사는 이에 대해 지체 없이 조치합니다.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary mb-3">제8조 (개인정보 보호책임자)</h2>
            <ul className="list-none space-y-1">
              <li><strong>담당부서:</strong> 경영지원팀</li>
              <li><strong>이메일:</strong> privacy@wisein.co.kr</li>
              <li><strong>전화:</strong> 02-1234-5678</li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-muted-foreground/60">본 방침은 2025년 1월 1일부터 시행됩니다.</p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Privacy;
