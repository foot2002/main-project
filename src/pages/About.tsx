import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Building2, Target, Clock, Newspaper, MapPin, ArrowRight } from "lucide-react";

const aboutPages = [
  { icon: Building2, title: "회사 소개", titleEn: "Company Overview", desc: "2007년 설립 이래, 데이터와 AI 전 영역에서 신뢰를 쌓아온 WiseIN을 소개합니다.", href: "/about/overview" },
  { icon: Target, title: "미션 & 비전", titleEn: "Mission & Vision", desc: "데이터 기반 사회 혁신에 기여하는 WiseIN의 미션과 비전을 확인하세요.", href: "/about/mission" },
  { icon: Clock, title: "연혁", titleEn: "History", desc: "2007년부터 현재까지, WiseIN의 성장과 주요 이정표를 살펴봅니다.", href: "/about/history" },
  { icon: Newspaper, title: "언론 보도", titleEn: "Press & Media", desc: "WiseIN의 주요 뉴스와 언론 보도를 확인하세요.", href: "/about/press" },
  { icon: MapPin, title: "오시는 길", titleEn: "Location", desc: "WiseIN 본사 위치와 교통 안내입니다.", href: "/about/location" },
];

const About = () => (
  <Layout>
    <section className="bg-primary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-blue-highlight text-sm font-medium tracking-widest uppercase mb-4 font-display">About Us</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">회사 소개</h1>
        <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">
          23년간 데이터와 AI 영역에서 신뢰를 쌓아온 WiseIN Company를 소개합니다.
        </p>
      </div>
    </section>

    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutPages.map((page) => (
            <Link
              key={page.title}
              to={page.href}
              className="group bg-card rounded-lg border border-border p-8 hover:border-blue-highlight/30 hover:shadow-lg hover:shadow-blue-highlight/5 transition-all duration-300"
            >
              <page.icon className="w-10 h-10 text-blue-highlight mb-5" strokeWidth={1.5} />
              <h2 className="text-lg font-bold text-primary mb-1">{page.title}</h2>
              <p className="text-xs text-muted-foreground mb-3 font-display">{page.titleEn}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{page.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-highlight opacity-0 group-hover:opacity-100 transition-opacity">
                자세히 보기 <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
