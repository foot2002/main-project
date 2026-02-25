import { Link } from "react-router-dom";
import logo from "@/assets/wisein_logo.png";

const footerLinks = [
  {
    title: "사업 영역",
    links: [
      { label: "데이터 분석", href: "/business/data-analytics" },
      { label: "AI 솔루션", href: "/business/ai-solutions" },
      { label: "플랫폼 서비스", href: "/business/platform" },
      { label: "교육", href: "/business/education" },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "회사 소개", href: "/about/overview" },
      { label: "포트폴리오", href: "/portfolio" },
      { label: "블로그", href: "/blog" },
    ],
  },
  {
    title: "고객 지원",
    links: [
      { label: "문의하기", href: "/support/contact" },
      { label: "FAQ", href: "/support/faq" },
      { label: "공지사항", href: "/support/notice" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="WiseIN Company" className="h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              데이터와 AI로 비즈니스의 세계를 열다.
              <br />
              23년의 경험으로 공공기관과 기업의
              <br />
              전략적 의사결정을 지원합니다.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold mb-4 tracking-wide">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} WiseIN Company. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
              개인정보처리방침
            </Link>
            <Link to="/terms" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
